import { db } from "../../db/connection.js";

export const getKardex = async (req, res) => {
  try {
    const query = `SELECT k.*, 
    ap.matricula, 
    pe.periodo, 
    pa.nombreOficial, 
    g.nombre AS grupo, 
    mp.materia AS mapa, 
    mp.clave, 
    mp.cuatrimestre, 
    p.nombre, 
    p.paterno AS paterno, 
    p.materno AS materno
    FROM kardex AS k
    INNER JOIN alumnopa AS ap ON ap.idAlumnoPA = k.idAlumnoPA
    INNER JOIN alumno AS a ON a.idAlumno = ap.idAlumno
    INNER JOIN persona AS p ON p.idPersona = a.idAlumno
    INNER JOIN mapacurricular AS mp ON mp.idMapaCurricular = k.idmapacurricular
    INNER JOIN grupo AS g ON g.idGrupo = k.idGrupo
    INNER JOIN periodo AS pe ON pe.idPeriodo = k.idPeriodo
    INNER JOIN programaacademico AS pa ON pa.idProgramaAcademico = ap.idProgramaAcademico;`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Kardex obtenido correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener los kardexs:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createKardex = async (req, res) => {
  try {
    const { idAlumnoPrograma, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo } = req.body;
    if (!idAlumnoPrograma || !idMapaCurricular || !idGrupo || !idPeriodo || !calificacionFinal || !tipo) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const [rows] = await db.query(
      "INSERT INTO kardex (idAlumnoPrograma, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo) VALUES (?, ?, ?, ?, ?, ?)",
      [idAlumnoPrograma, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo]
    );
    res.status(201).json({
      message: "Kardex creado correctamente",
      idKardex: rows.insertId,
      idAlumnoPrograma,
      idMapaCurricular,
      idGrupo,
      idPeriodo,
      calificacionFinal,
      tipo,
    });
  } catch (error) {
    console.error("Error al crear kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateKardex = async (req, res) => {
  try {
    const { idKardex } = req.params;
    const { idAlumnoPrograma, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo } = req.body;
    const [exists] = await db.query("SELECT 1 FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!exists.length) {
      return res.status(404).json({ message: "El kardex no existe" });
    }
    const [result] = await db.query(
      "UPDATE kardex SET idAlumnoPrograma = ?, idMapaCurricular = ?, idGrupo = ?, idPeriodo = ?, calificacionFinal = ?, tipo = ? WHERE idKardex = ?",
      [idAlumnoPrograma, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, idKardex]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el kardex" });
    }
    res.status(200).json({
      message: "Kardex actualizado correctamente",
      idKardex,
      idAlumnoPrograma,
      idMapaCurricular,
      idGrupo,
      idPeriodo,
      calificacionFinal,
      tipo
    });
  } catch (error) {
    console.error("Error al actualizar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteKardex = async (req, res) => {
  try {
    const { idKardex } = req.params;
    const [kardex] = await db.query("SELECT idAlumnoPrograma FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!kardex.length) {
      return res.status(404).json({ message: "Kardex no encontrado" });
    }
    const [rows] = await db.query("DELETE FROM kardex WHERE idKardex = ?", [idKardex]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: `Kardex con idKardex ${idKardex} eliminado correctamente` });
    } else {
      res.status(404).json({ message: "No se pudo eliminar el kardex" });
    }
  } catch (error) {
    console.error("Error al eliminar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
