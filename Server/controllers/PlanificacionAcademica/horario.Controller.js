import { db } from "../../db/connection.js";

// Obtener todos los horarios
export const getHorario = async (req, res) => {
  try {
      const [rows] = await db.query(`
          SELECT 
              h.idHorario,
              h.idGrupoMateria,
              gm.idGrupo,
              gm.idProfesor,
              gm.idMapaCurricular,
              gm.idAula,
              gm.tipo,
              h.idBloque,
              h.dia
          FROM horario h
          JOIN grupomateria gm ON h.idGrupoMateria = gm.idGrupoMateria
      `);
      console.log("Horarios obtenidos en la API:", rows);
      res.json(rows);
  } catch (error) {
      console.error("Error al obtener horarios:", error);
      res.status(500).json({ message: "Error interno del servidor" });
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