import { db } from "../../db/connection.js"; 
//Act. 
export const getAlumnoTramitetodos = async (req, res) => {
  try {
    const query = `
      SELECT 
        Alt.idAlumnoTramite,
        Alt.idTramite,
        Alt.idPersona,
        Alt.idAlumnoPA,
        Alt.idPeriodo,
        Alt.fecha,  
        Alt.estatus,
        COALESCE(Alt.idAlumnoPA, apa.idAlumnoPA) AS idAlumnoPA, 
        apa.matricula AS matricula,
        prog.nombreOficial AS programa,
        COALESCE(a.idAlumno, a.idAlumno) AS idAlumno,
        tramite.nombre AS tramite,
        periodo.periodo AS periodo,
        CONCAT(persona.nombre, ' ', persona.paterno, ' ', persona.materno) AS alumno
      FROM alumnotramite Alt
      LEFT JOIN periodo ON Alt.idPeriodo = periodo.idPeriodo
      LEFT JOIN tramite ON Alt.idTramite = tramite.idTramite
      LEFT JOIN persona ON Alt.idPersona = persona.idPersona
      LEFT JOIN alumno a ON persona.idPersona = a.idAlumno
      LEFT JOIN alumnopa apa ON a.idAlumno = apa.idAlumno
      LEFT JOIN programaacademico prog ON apa.idProgramaAcademico = prog.idProgramaAcademico;
    `;

    const [rows] = await db.query(query);
    res.json({ message: "Alumno con Trámites obtenidos correctamente", data: rows.length > 0 ? rows : [] });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


// 🔹 CREAR UN NUEVO TRÁMITE PARA UN ALUMNO
export const createAlumnoTramite = async (req, res) => {
  try {
    const { idTramite, idPersona, idPeriodo, fecha, estatus } = req.body;
    
    if (!idTramite || !idPersona || !idPeriodo || !fecha || !estatus) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Buscar idAlumno e idAlumnoPA automáticamente
    const [result] = await db.query(
      `SELECT a.idAlumno, pa.idAlumnoPA 
       FROM persona p
       LEFT JOIN alumno a ON p.idPersona = a.idAlumno
       LEFT JOIN alumnopa pa ON a.idAlumno = pa.idAlumno
       WHERE p.idPersona = ? LIMIT 1;`, 
      [idPersona]
    );

    const idAlumnoPA = result.length > 0 ? result[0].idAlumnoPA : null;

    // Insertar trámite con idAlumnoPA detectado
    const [insert] = await db.query(
      `INSERT INTO alumnotramite (idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus]
    );

    res.status(201).json({ message: "Alumno Trámite creado correctamente", idAlumnoTramite: insert.insertId });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


// 🔹 ACTUALIZAR UN TRÁMITE EXISTENTE
export const updateAlumnoTramite = async (req, res) => {
  try {
    const { idAlumnoTramite } = req.params;
    const { idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus } = req.body;

    // Verificar si el trámite existe
    const [exists] = await db.query("SELECT 1 FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    if (!exists.length) return res.status(404).json({ message: "Alumno Trámite no encontrado" });

    // Actualizar el trámite (idAlumnoPA puede ser NULL)
    const [result] = await db.query(
      "UPDATE alumnotramite SET idTramite = ?, idPersona = ?, idAlumnoPA = ?, idPeriodo = ?, fecha = ?, estatus = ? WHERE idAlumnoTramite = ?",
      [idTramite, idPersona, idAlumnoPA || null, idPeriodo, fecha, estatus, idAlumnoTramite]
    );

    if (!result.affectedRows) return res.status(404).json({ message: "Alumno Trámite no encontrado" });

    // Obtener el registro actualizado
    const [[updated]] = await db.query("SELECT * FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    res.json({ message: `Alumno Trámite '${updated.idAlumnoTramite}' actualizado correctamente`, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// 🔹 ELIMINAR UN TRÁMITE
export const deleteAlumnoTramite = async (req, res) => {
  try {
    const { idAlumnoTramite } = req.params;

    // Verificar si el trámite del alumno existe
    const [alumnotramite] = await db.query("SELECT idAlumnoTramite FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);
    if (!alumnotramite.length) 
      return res.status(404).json({ message: "Alumno Trámite no encontrado" });

    // Eliminar el trámite del alumno
    const [rows] = await db.query("DELETE FROM alumnotramite WHERE idAlumnoTramite = ?", [idAlumnoTramite]);

    // Verificar si la eliminación se realizó correctamente
    rows.affectedRows
      ? res.status(200).json({ message: `Trámite eliminado correctamente` })
      : res.status(404).json({ message: "Alumno Trámite no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
