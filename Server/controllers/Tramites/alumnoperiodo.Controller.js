import { db } from "../../db/conexion.js"; 
//Act. 
export const getAlumnoPeriodo = async (req, res) => {
  try {
    const query = `
      SELECT aper.*, 
      alumnopa.matricula AS matricula,
      prog.nombreOficial AS programa,
      CONCAT(persona.nombre, ' ', persona.paterno, ' ', persona.materno) AS NombreAlumno,
      periodo.periodo AS periodo
      FROM alumnoPeriodo aper
      LEFT JOIN alumnopa ON alumnopa.idAlumnoPA = aper.idAlumnoPA
      LEFT JOIN alumno ON alumno.idAlumno = alumnopa.idAlumno
      LEFT JOIN persona ON persona.idPersona = alumno.idAlumno
      LEFT JOIN periodo ON periodo.idPeriodo = aper.idPeriodo
      LEFT JOIN programaacademico prog ON prog.idProgramaAcademico = alumnopa.idProgramaAcademico 
  `;

    const [rows] = await db.query(query);
    res.json({ message: "Alumno con Trámites obtenidos correctamente", data: rows.length > 0 ? rows : [] });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
