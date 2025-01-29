import { db } from "../../db/connection.js";

export const getAlumnoProcesotodos = async(req, res) => {
  try {
    const query = `
      SELECT 
        ap.idAlumnoProceso,
        ap.idAlumnoTramite,
        ap.idTramiteProceso,
        ap.idActividad,
        ap.orden,
        ap.estatus,
        ap.observacion,
        act.nombre AS NombreActividad,
        persona.nombre AS NombreAlumno
      FROM 
        alumnoproceso ap
      JOIN 
        actividad act ON ap.idActividad = act.idActividad
      JOIN 
        tramiteproceso tp ON ap.idTramiteProceso = tp.idTramiteProceso
      JOIN 
        alumnotramite atr ON ap.idAlumnoTramite = atr.idAlumnoTramite
      JOIN
        alumnopa apa ON atr.idAlumnoPA = apa.idAlumnoPA
      JOIN
        alumno ON apa.idAlumno = alumno.idAlumno
      JOIN 
        persona ON alumno.idAlumno = persona.idPersona
    `;
    // Ejecutar la consulta
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Alumno en Proceso obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron alumnos en proceso" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createAlumnoProceso = async (req, res) => {
  try {
  
    const { idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion } = req.body;
    if (!idAlumnoTramite || !idTramiteProceso || !idActividad || !orden || !estatus) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }
    const [exists] = await db.query("SELECT 1 FROM alumnoproceso WHERE idAlumnoTramite = ? AND idTramiteProceso = ?", [idAlumnoTramite, idTramiteProceso]);
    if (exists.length) return res.status(400).json({ message: "El proceso del alumno ya existe" });
    const [rows] = await db.query(
      "INSERT INTO alumnoproceso (idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion) VALUES (?, ?, ?, ?, ?, ?)",
      [idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion]
    );
    res.status(201).json({ message: "Alumno Proceso creado correctamente", idAlumnoProceso: rows.insertId });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateAlumnoProceso = async (req, res) => {
  try {
    const { idAlumnoProceso } = req.params;
    const { idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumnoproceso WHERE idAlumnoProceso = ?", [idAlumnoProceso]);
    if (!exists.length) return res.status(404).json({ message: "Alumno Proceso no encontrado" });
    if (idAlumnoTramite && idTramiteProceso) {
      const [duplicateCheck] = await db.query("SELECT 1 FROM alumnoproceso WHERE idAlumnoTramite = ? AND idTramiteProceso = ? AND idAlumnoProceso != ?", [idAlumnoTramite, idTramiteProceso, idAlumnoProceso]);
      if (duplicateCheck.length) return res.status(400).json({ message: "El proceso del alumno ya existe" });
    }
    // Actualización del registro sin IFNULL
    const [result] = await db.query(
      "UPDATE alumnoproceso SET IdAlumnoTramite = ?, IdTramiteProceso = ?, IdActividad = ?, Orden = ?, Estatus = ?, Observacion = ? WHERE IdAlumnoProceso = ?",
      [idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion, idAlumnoProceso]
    );
    if (!result.affectedRows) return res.status(404).json({ message: "Alumno Proceso no encontrado" });
    // Obtener el registro actualizado
    const [[updated]] = await db.query("SELECT * FROM alumnoproceso WHERE idAlumnoProceso = ?", [idAlumnoProceso]);
    res.json({ message: `Alumno Proceso '${updated.idAlumnoProceso}' actualizado correctamente`, data: updated });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteAlumnoProceso = async(req, res) => {
  try {
    const { IdAlumnoProceso } = req.params;
    // Verificar si el proceso del alumno existe
    const [proceso] = await db.query("SELECT CONCAT(persona.nombre, ' ', persona.apellido_paterno, ' ', persona.apellido_materno) AS NombreAlumno FROM alumnoproceso ap JOIN alumnotramite atr ON ap.idAlumnoTramite = atr.idAlumnoTramite JOIN alumnopa apa ON atr.idAlumnoPA = apa.idAlumnoPA JOIN alumno ON apa.idAlumno = alumno.idAlumno JOIN persona ON alumno.idAlumno = persona.idPersona WHERE ap.idAlumnoProceso = ?", [idAlumnoProceso]);
    if (!proceso.length) 
      return res.status(404).json({ message: "Alumno Proceso no encontrado" });    
    // Eliminar el proceso del alumno
    const [rows] = await db.query("DELETE FROM alumnoproceso WHERE idAlumnoProceso = ?", [idAlumnoProceso]);
    // Verificar si la eliminación se realizó correctamente
    rows.affectedRows
      ? res.status(200).json({ message: `Proceso de '${proceso[0].NombreAlumno}' eliminado correctamente` })
      : res.status(404).json({ message: "Alumno Proceso no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
