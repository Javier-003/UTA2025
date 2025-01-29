import { db } from "../../db/connection.js";

export const getAlumnopatodos = async (req, res) => {
  try {
    const query = `
      SELECT alp.*, 
             CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre, 
             pe.periodo, 
             CONCAT(pa.Titulo_tsu, ' ', pa.Titulo_Ing) AS programa 
      FROM integradora_se.alumno_programa AS alp
      INNER JOIN alumno AS al ON al.id_alumno = alp.idAlumno
      INNER JOIN persona AS p ON p.id_persona = al.id_alumno
      INNER JOIN periodo AS pe ON pe.id_periodo = alp.idPeriodo
      INNER JOIN programaacademico AS pa ON pa.id_programa_academico = alp.idProgramaAcademico
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Datos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos en alumno_programa" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createAlumnopa = async (req, res) => {
  try {
    const { idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta } = req.body;
    if (!idAlumno || !idProgramaAcademico || !idPeriodo || !matricula || !estatus || !desde || !hasta) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta" });
    }
    const [exists] = await db.query("SELECT 1 FROM alumno_programa WHERE matricula = ?", [matricula]);
    if (exists.length) {
      return res.status(400).json({ message: "La matrícula ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO alumno_programa (idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta]
    );
    res.status(201).json({
      message: `'${matricula}' creado`,
      idAlumnoPrograma: rows.insertId,
      idAlumno,
      idProgramaAcademico,
      idPeriodo,
      matricula,
      estatus,
      desde, hasta
    });
  } catch (error) {
    console.error("Error al crear alumno_programa:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateAlumnopa = async (req, res) => {
  try {
    const { idAlumnoPrograma } = req.params;
    const { idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumno_programa WHERE idAlumnoPrograma = ?", [idAlumnoPrograma]);
    if (!exists.length) {
      return res.status(404).json({ message: "El alumno_programa no existe" });
    }
    const [result] = await db.query(
      "UPDATE alumno_programa SET idAlumno = ?, idProgramaAcademico = ?, idPeriodo = ?, matricula = ?, estatus = ?, desde = ?, hasta = ? WHERE idAlumnoPrograma = ?",
      [idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, idAlumnoPrograma]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el alumno_programa" });
    }
    res.status(200).json({
      message: `'${matricula}' actualizado correctamente`,
      idAlumnoPrograma,
      idAlumno,
      idProgramaAcademico,
      idPeriodo,
      matricula,
      estatus,
      desde,hasta
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error });
  }
};

export const deleteAlumnopa = async (req, res) => {
  try {
    const { idAlumnoPrograma } = req.params;
    const [alumnoPrograma] = await db.query("SELECT matricula FROM alumno_programa WHERE idAlumnoPrograma = ?", [idAlumnoPrograma]);
    if (!alumnoPrograma.length) return res.status(404).json({ message: "alumno_programa no encontrado" });
    const [rows] = await db.query("DELETE FROM alumno_programa WHERE idAlumnoPrograma = ?", [idAlumnoPrograma]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${alumnoPrograma[0].matricula}' eliminado correctamente` })
      : res.status(404).json({ message: "alumno_programa no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
