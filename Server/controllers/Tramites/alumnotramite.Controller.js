import { db } from "../../db/connection.js";

export const getAlumnoTramitetodos = async(req, res) => {
  try {
    const query = `SELECT 
        Alt.idAlumnoTramite,
        Alt.idTramite,
        Alt.idAlumnoPA,
        Alt.idPeriodo,
        Alt.fecha,  
        Alt.estatus,
        apa.matricula AS matricula,
        prog.nombreOficial AS programa, 
        alumno.idAlumno,
        tramite.nombre AS tramite, 
        periodo.periodo AS periodo, 
        CONCAT(persona.nombre, ' ', persona.paterno, ' ', persona.materno) AS alumno
      FROM
        alumnotramite Alt
      JOIN 
        periodo ON Alt.idPeriodo = periodo.idPeriodo
      JOIN
        tramite ON Alt.idTramite = tramite.idTramite
      JOIN
        alumnopa apa ON Alt.idAlumnoPA = apa.idAlumnoPA
      JOIN
        alumno ON apa.idAlumno = alumno.idAlumno
      JOIN 
        persona ON alumno.idAlumno = persona.idPersona
      LEFT JOIN 
        programaacademico prog ON apa.idProgramaAcademico = prog.idProgramaAcademico`;
    // Ejecutar la consulta
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Alumno con Tramites obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron alumnos con tramites" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createAlumnoTramite = async (req, res) => {
  try {
    const { idTramite, idAlumnoPA, idPeriodo, fecha, estatus } = req.body;
    // Validar que todos los campos requeridos estén presentes
    if (!idTramite || !idAlumnoPA || !idPeriodo || !fecha || !estatus) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const [exists] = await db.query("SELECT 1 FROM alumnotramite WHERE idTramite = ? AND idAlumnoPA = ?", [idTramite, idAlumnoPA]);
    if (exists.length) return res.status(400).json({ message: "El trámite del alumno ya existe" });
    const [rows] = await db.query(
      "INSERT INTO alumnotramite (idTramite, idAlumnoPA, idPeriodo, fecha, estatus) VALUES (?, ?, ?, ?, ?)",
      [idTramite, idAlumnoPA, idPeriodo, fecha, estatus]
    );
    res.status(201).json({ message: "Alumno Tramite creado correctamente", idAlumnoTramite: rows.insertId });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateAlumnoTramite = async (req, res) => {
  try {
    const { idAlumnoTramite } = req.params;
    const { idTramite, idAlumnoPA, idPeriodo, fecha, estatus } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    if (!exists.length) return res.status(404).json({ message: "Alumno Tramite no encontrado" });
    if (idTramite && idAlumnoPA) {
      const [duplicateCheck] = await db.query("SELECT 1 FROM alumnotramite WHERE idTramite = ? AND idAlumnoPA = ? AND idAlumnoTramite != ?", [idTramite, idAlumnoPA, idAlumnoTramite]);
      if (duplicateCheck.length) return res.status(400).json({ message: "El trámite del alumno ya existe" });
    }
    const [result] = await db.query(
      "UPDATE alumnotramite SET idTramite = ?, idAlumnoPA = ?, idPeriodo = ?, fecha = ?, estatus = ? WHERE idAlumnoTramite = ?",
      [idTramite, idAlumnoPA, idPeriodo, fecha, estatus, idAlumnoTramite]
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Alumno Tramite no encontrado" });
    // Obtener el registro actualizado
    const [[updated]] = await db.query("SELECT * FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    res.json({ message: `Alumno Tramite '${updated.idAlumnoTramite}' actualizado correctamente`, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


export const deleteAlumnoTramite = async (req, res) => {
  try {
    const { idAlumnoTramite } = req.params;
    // Verificar si el trámite del alumno existe
    const [alumnotramite] = await db.query("SELECT idAlumnoTramite FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    if (!alumnotramite.length) 
      return res.status(404).json({ message: "Alumno Tramite no encontrado" });
    // Eliminar el trámite del alumno
    const [rows] = await db.query("DELETE FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    // Verificar si la eliminación se realizó correctamente
    rows.affectedRows
      ? res.status(200).json({ message: `Trámite eliminado correctamente` })
      : res.status(404).json({ message: "Alumno Tramite no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

