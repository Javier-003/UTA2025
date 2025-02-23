import { db } from "../../db/connection.js";

// Obtener todos los horarios
export const getHorario = async (req, res) => {
  try {
    const query = `
      SELECT h.*, 
             b.nombre AS turno, 
             b.horaInicio, 
             b.horaFin, 
             gm.idAula 
      FROM horario AS h
      INNER JOIN grupomateria AS gm ON gm.idGrupoMateria = h.idGrupoMateria
      INNER JOIN bloque AS b ON b.idBloque = h.idBloque;
    `;

    const [rows] = await db.query(query);
    
    if (rows.length > 0) {
      res.json({ message: "Horario obtenido correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


// Crear un horario
export const createHorario = async (req, res) => {
  try {
    const { idGrupoMateria, idBloque, dia } = req.body;

    if (!idGrupoMateria || !idBloque || !dia) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const query = `
      INSERT INTO horario (idGrupoMateria, idBloque, dia)
      VALUES (?, ?, ?)
    `;
    const [result] = await db.query(query, [idGrupoMateria, idBloque, dia]);

    res.status(201).json({
      message: "Horario creado correctamente",
      idHorario: result.insertId,
      idGrupoMateria,
      idBloque,
      dia,
    });
  } catch (error) {
    console.error("Error al crear horario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Actualizar un horario
export const updateHorario = async (req, res) => {
  try {
    const { idHorario } = req.params;
    const { idGrupoMateria, idBloque, dia } = req.body;

    if (!idGrupoMateria || !idBloque || !dia) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const query = `
      UPDATE horario
      SET idGrupoMateria = ?, idBloque = ?, dia = ?
      WHERE idHorario = ?
    `;
    const [result] = await db.query(query, [idGrupoMateria, idBloque, dia, idHorario]);

    if (result.affectedRows > 0) {
      res.json({ message: "Horario actualizado correctamente", idHorario, idGrupoMateria, idBloque, dia });
    } else {
      res.status(404).json({ message: "Horario no encontrado" });
    }
  } catch (error) {
    console.error("Error al actualizar horario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Eliminar un horario
export const deleteHorario = async (req, res) => {
  try {
    const { idHorario } = req.params;

    const query = `DELETE FROM horario WHERE idHorario = ?`;
    const [result] = await db.query(query, [idHorario]);

    if (result.affectedRows > 0) {
      res.json({ message: "Horario eliminado correctamente", idHorario });
    } else {
      res.status(404).json({ message: "Horario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar horario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};