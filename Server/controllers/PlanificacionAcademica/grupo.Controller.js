import { db } from "../../db/connection.js";

// Obtener todos los grupos
export const getGruposTodos = async (req, res) => {
  try {
    const query = `SELECT g.*, p.periodo, 
    CONCAT(COALESCE(pa.nombre, ''), ' ', COALESCE(pa.nombreOficial, '')) AS programa_academico,
    CONCAT(tutor.nombre, ' ', tutor.paterno, ' ', tutor.materno) AS tutor
    FROM grupo g
    JOIN periodo p ON g.idPeriodo = p.idPeriodo
    JOIN programaacademico pa ON g.idProgramaAcademico = pa.idProgramaAcademico
    JOIN profesor ON g.idTutor = profesor.idProfesor
    JOIN persona tutor ON profesor.idProfesor = tutor.idPersona`;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los grupos:", error);
    res.status(500).json({ error: "Error al obtener los grupos" });
  }
};

// crear un grupo
export const createGrupo = async (req, res) => {
  const { idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha } = req.body;
  try {
    const query = `INSERT INTO grupo (idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const [result] = await db.query(query, [idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha]);
    res.json({ id: result.insertId, message: "Grupo registrado correctamente" });
  } catch (error) {
    console.error("Error al registrar el grupo:", error);
    res.status(500).json({ error: "Error al registrar el grupo" });
  }
};

// Actualizar un grupo
export const updateGrupo = async (req, res) => {
  const { idGrupo } = req.params;
  const { idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha } = req.body;
  try {
    const query = `UPDATE grupo SET idPeriodo = ?, idProgramaAcademico = ?, idTutor = ?, nombre = ?, cuatrimestre = ?, observacion = ?, estatus = ?, fecha = ?
    WHERE idGrupo = ?`;
    await db.query(query, [idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha, idGrupo]);
    res.json({ message: "Grupo actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el grupo:", error);
    res.status(500).json({ error: "Error al actualizar el grupo" });
  }
};

// eliminar un grupo
export const deleteGrupo = async (req, res) => {
  const { idGrupo } = req.params;
  try {
    const query = `DELETE FROM grupo WHERE idGrupo = ?`;
    await db.query(query, [idGrupo]);
    res.json({ message: "Grupo eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
    res.status(500).json({ error: "Error al eliminar el grupo" });
  }
};