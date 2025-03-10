import { db } from "../../db/connection.js";

export const getAlumnopatodos = async (req, res) => {
  try {
    const query = `
      SELECT alp.*, 
      pe.periodo,  
      pa.nombreOficial AS carrera, 
      p.nombre, 
      p.paterno,
      p.materno 
      FROM alumnopa AS alp
      INNER JOIN alumno AS al ON al.idAlumno = alp.idAlumno
      INNER JOIN persona AS p ON p.idPersona = al.idAlumno
      INNER JOIN periodo AS pe ON pe.idPeriodo = alp.idPeriodo
      INNER JOIN programaacademico AS pa ON pa.idProgramaAcademico = alp.idProgramaAcademico
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Datos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos en alumnopa" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Crear alumnopa
export const createAlumnopa = async (req, res) => {
  try {
    const { idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta = null } = req.body;
    if (!idAlumno || !idProgramaAcademico || !idPeriodo || !matricula || !estatus || !desde) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde" });
    }
    const [existe] = await db.query("SELECT 1 FROM alumnopa WHERE matricula =?", [matricula]);
    if (existe.length) {
      return res.status(400).json({ message: "La matrícula ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO alumnopa (idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta]
    );
    res.status(201).json({
      message: `${matricula} creado`,
      idAlumnoPA: rows.insertId,idAlumno,idProgramaAcademico,idPeriodo,
      matricula,estatus,desde,hasta,
    });
  } catch (error) {
    console.error("Error al crear alumnopa:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Actualizar alumnopa
export const updateAlumnopa = async (req, res) => {
  try {
    const { idAlumnoPA } = req.params;
    const { idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta = null } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumnopa WHERE idAlumnoPA = ?", [idAlumnoPA]);
    if (!exists.length) {
      return res.status(404).json({ message: "El alumnopa no existe" });
    }
    const [result] = await db.query(
      "UPDATE alumnopa SET idAlumno = ?, idProgramaAcademico = ?, idPeriodo = ?, matricula = ?, estatus = ?, desde = ?, hasta = ? WHERE idAlumnoPA = ?",
      [idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, idAlumnoPA]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el idAlumnoPA" });
    }
    res.status(200).json({
      message: `${matricula} actualizado correctamente`,
      idAlumnoPA, idAlumno,idProgramaAcademico,idPeriodo,
      matricula,estatus,desde,hasta,
    });
  } catch (error) {
    console.error("Error al actualizar alumnopa:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// ----------- alumnopa UPDATE TRANSACCIÓN (AFECTA A KARDEX TAMBIÉN) --------------------------------------------------------
export const transaccionUpdateAlumnopa = async (req, res) => {
  try {
    const { idAlumnoPA } = req.params;
    const { idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta = null } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumnopa WHERE idAlumnoPA = ?", [idAlumnoPA]);
    if (!exists.length) {
      return res.status(404).json({ message: "El alumnopa no existe" });
    }
    const [result] = await db.query(
      "UPDATE alumnopa SET idAlumno = ?, idProgramaAcademico = ?, idPeriodo = ?, matricula = ?, estatus = ?, desde = ?, hasta = ? WHERE idAlumnoPA = ?",
      [idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, idAlumnoPA]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el idAlumnoPA" });
    }
    res.status(200).json({
      message: `${matricula} actualizado correctamente`,
      idAlumnoPA, idAlumno,idProgramaAcademico,idPeriodo,
      matricula,estatus,desde,hasta,
    });
  } catch (error) {
    console.error("Error al actualizar alumnopa:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};



// Eliminar alumnopa
export const deleteAlumnopa = async (req, res) => {
  try {
    const { idAlumnoPA } = req.params;
    const [alumnoPrograma] = await db.query("SELECT matricula FROM alumnopa WHERE idAlumnoPA = ?", [idAlumnoPA]);
    if (!alumnoPrograma.length) return res.status(404).json({ message: "alumnopa no encontrado" });
    const [rows] = await db.query("DELETE FROM alumnopa WHERE idAlumnoPA = ?", [idAlumnoPA]);
    rows.affectedRows
      ? res.status(200).json({ message: `${alumnoPrograma[0].matricula} eliminado correctamente` })
      : res.status(404).json({ message: "alumnopa no encontrado" });
  } catch (error) {
    console.error("Error al eliminar alumnopa:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
