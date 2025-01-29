import { db } from "../../db/connection.js";

export const getHorario = async (req, res) => {
  try {
    const query = `
      SELECT h.*, 
      b.Nombre AS hora
      FROM integradora_se.horario AS h
      INNER JOIN grupomateria AS gm ON gm.id_grupo_materia = h.idGrupoMateria
      INNER JOIN bloque AS b ON b.idBloque = h.id_Bloque

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

export const createHorario = async (req, res) => {
    try {
        const {idGrupoMateria, id_Bloque, dia} = req.body;
    
        if (!idGrupoMateria || !id_Bloque || !dia) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
    
        const [rows] = await db.query(
        "INSERT INTO horario (idGrupoMateria, id_Bloque, dia) VALUES (?, ?, ?)",
        [idGrupoMateria, id_Bloque, dia]
        );
    
        res.status(201).json({
        message: "Horario creado correctamente",
        idHorario: rows.insertId,
        idGrupoMateria,
        id_Bloque,
        dia,
        });
    } catch (error) {
        console.error("Error al crear horario:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
    }

    export const updateHorario = async (req, res) => {
        try {
            const { idHorario, idGrupoMateria, id_Bloque, dia } = req.body;
            if (!idHorario || !idGrupoMateria || !id_Bloque || !dia) {
            return res.status(400).json({ message: "Todos los campos son requeridos" });
            }
        
            const [rows] = await db.query(
            "UPDATE horario SET idGrupoMateria = ?, id_Bloque = ?, dia = ? WHERE idHorario = ?",
            [idGrupoMateria, id_Bloque, dia, idHorario]
            );
        
            if (rows.affectedRows > 0) {
            res.json({ message: "Horario actualizado correctamente", idHorario, idGrupoMateria, id_Bloque, dia });
            } else {
            res.status(404).json({ message: "Horario no encontrado" });
            }
        } catch (error) {
            console.error("Error al actualizar horario:", error);
            res.status(500).json({ message: "Algo salió mal", error: error.message });
        }
    }


    export const deleteHorario = async (req, res) => {
        try {
            const { idHorario } = req.params;
        
            const [rows] = await db.query("DELETE FROM horario WHERE idHorario = ?", [idHorario]);
        
            if (rows.affectedRows > 0) {
            res.json({ message: "Horario eliminado correctamente", idHorario });
            } else {
            res.status(404).json({ message: "Horario no encontrado" });
            }
        } catch (error) {
            console.error("Error al eliminar horario:", error);
            res.status(500).json({ message: "Algo salió mal", error: error.message });
        }
    }
    