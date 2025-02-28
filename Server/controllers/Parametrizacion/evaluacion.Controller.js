import { db } from "../../db/connection.js";

export const getEvaluacion = async (req, res) => {
  try {
    const query = `
SELECT eva.idEvaluacion, 
      eva.idKadex, eva.idMapaCurricular, eva.idMateriaUnidad, eva.calificacion, eva.faltas, eva.nombreUnidad, eva.estatus, 
      mc.materia
      FROM evaluacion AS eva
      JOIN mapacurricular AS mc ON eva.idMapaCurricular = mc.idMapaCurricular`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Evaluación obtenida correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener la evaluación:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createEvaluacion = async (req, res) => {
  try {
    const { idKadex, idMapaCurricular, faltas, calificacion, estatus, nombreUnidad, idMateriaUnidad } = req.body;
    if (!idKadex || !idMapaCurricular || !faltas || !calificacion || !estatus || !nombreUnidad || !idMateriaUnidad) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const [rows] = await db.query(
      "INSERT INTO evaluacion (idKadex, idMapaCurricular, faltas, calificacion, estatus, nombreUnidad, idMateriaUnidad) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idKadex, idMapaCurricular, faltas, calificacion, estatus, nombreUnidad, idMateriaUnidad]
    );
    res.status(201).json({
      message: "Evaluación creada correctamente",
      idEvaluacion: rows.insertId,
      idKadex,idMapaCurricular,faltas,calificacion,estatus,nombreUnidad,idMateriaUnidad,
    });
  } catch (error) {
    console.error("Error al crear la evaluación:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateEvaluacion = async (req, res) => {
  try {
    const { idEvaluacion } = req.params;
    const { idKadex, idMapaCurricular, faltas, calificacion, estatus, nombreUnidad, idMateriaUnidad } = req.body;
    const [exists] = await db.query("SELECT 1 FROM evaluacion WHERE idEvaluacion = ?", [idEvaluacion]);
    if (!exists.length) {
      return res.status(404).json({ message: "La evaluación no existe" });
    }
    const [result] = await db.query(
      "UPDATE evaluacion SET idKadex = ?, idMapaCurricular = ?, faltas = ?, calificacion = ?, estatus = ?, nombreUnidad = ?, idMateriaUnidad = ? WHERE idEvaluacion = ?",
      [idKadex, idMapaCurricular, faltas, calificacion, estatus, nombreUnidad, idMateriaUnidad, idEvaluacion]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar la evaluación" });
    }
    res.status(200).json({
      message: "Evaluación actualizada correctamente",
      idEvaluacion,idKadex,idMapaCurricular,faltas,calificacion,estatus,nombreUnidad,idMateriaUnidad,
    });
  } catch (error) {
    console.error("Error al actualizar la evaluación:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteEvaluacion = async (req, res) => {
  try {
    const { idEvaluacion } = req.params;
    const [evaluacion] = await db.query("SELECT idEvaluacion FROM evaluacion WHERE idEvaluacion = ?", [idEvaluacion]);
    if (!evaluacion.length) {
      return res.status(404).json({ message: "Evaluación no encontrada" });
    }
    const [rows] = await db.query("DELETE FROM evaluacion WHERE idEvaluacion = ?", [idEvaluacion]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: `Evaluación con idEvaluacion ${idEvaluacion} eliminada correctamente` });
    } else {
      res.status(404).json({ message: "No se pudo eliminar la evaluación" });
    }
  } catch (error) {
    console.error("Error al eliminar la evaluación:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
