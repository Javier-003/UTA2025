import { db } from "../../db/connection.js";

// Helper: un campo "falta" solo si viene undefined, null o cadena vacia.
// OJO: no se usa !valor porque eso tambien rechaza el 0, que puede ser valido.
const falta = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

// Helper: convierte "" a null para columnas opcionales.
// Importante en columnas DATE: MySQL rechaza "" con "Incorrect date value".
const opcional = (v) => (falta(v) ? null : v);

// Campos NOT NULL en la tabla programaacademico (los unicos realmente obligatorios).
// nombreOficial, descripcion, sigla, hasta y estatus aceptan NULL en la BD.
const revisarObligatorios = (datos) => {
  const requeridos = {
    idNivelEstudio: datos.idNivelEstudio,
    idOfertaAcademica: datos.idOfertaAcademica,
    nombre: datos.nombre,
    anio: datos.anio,
    totalPeriodos: datos.totalPeriodos,
    totalCreditos: datos.totalCreditos,
    desde: datos.desde
  };
  return Object.entries(requeridos)
    .filter(([_, valor]) => falta(valor))
    .map(([campo]) => campo);
};

//obtener todos los programas academicos
export const getProgramaAcademico = async (req, res) => {
  try {
    const query = `
      SELECT pa.*,
        ne.nombre AS nivelEstudio,
        oa.nombre AS ofertaAcademica
      FROM programaacademico AS pa
      INNER JOIN nivelestudio AS ne ON ne.idNivelEstudio = pa.idNivelEstudio
      INNER JOIN ofertaacademica AS oa ON oa.idOfertaAcademica = pa.idOfertaAcademica
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Programas académicos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener los programas académicos:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

//crear un programa academico
export const createProgramaAcademico = async (req, res) => {
  const { idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus } = req.body;

  const faltantes = revisarObligatorios(req.body);
  if (faltantes.length > 0) {
    return res.status(400).json({
      message: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`
    });
  }

  try {
    const query = `
      INSERT INTO programaacademico (idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [
      idNivelEstudio, idOfertaAcademica, nombre,
      opcional(nombreOficial), opcional(descripcion), opcional(sigla),
      anio, totalPeriodos, totalCreditos, desde,
      opcional(hasta), opcional(estatus)
    ]);
    res.status(201).json({ message: "Programa académico creado correctamente" });
  } catch (error) {
    console.error("Error al crear el programa académico:", error);
    res.status(500).json({ message: "Error al crear el programa académico", error: error.message });
  }
};

//actualizar un programa academico
export const updateProgramaAcademico = async (req, res) => {
  const { idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus } = req.body;

  const faltantes = revisarObligatorios(req.body);
  if (falta(idProgramaAcademico)) faltantes.unshift("idProgramaAcademico");
  if (faltantes.length > 0) {
    return res.status(400).json({
      message: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`
    });
  }

  try {
    const query = `
      UPDATE programaacademico
      SET idNivelEstudio = ?, idOfertaAcademica = ?, nombre = ?, nombreOficial = ?, descripcion = ?, sigla = ?, anio = ?, totalPeriodos = ?, totalCreditos = ?, desde = ?, hasta = ?, estatus = ?
      WHERE idProgramaAcademico = ?
    `;
    await db.query(query, [
      idNivelEstudio, idOfertaAcademica, nombre,
      opcional(nombreOficial), opcional(descripcion), opcional(sigla),
      anio, totalPeriodos, totalCreditos, desde,
      opcional(hasta), opcional(estatus),
      idProgramaAcademico
    ]);
    res.json({ message: "Programa académico actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el programa académico:", error);
    res.status(500).json({ message: "Error al actualizar el programa académico", error: error.message });
  }
};

//eliminar un programa academico
export const deleteProgramaAcademico = async (req, res) => {
  try {
    const { idProgramaAcademico } = req.params;
    const [programaAcademico] = await db.query("SELECT nombre FROM programaacademico WHERE idProgramaAcademico = ?", [idProgramaAcademico]);
    if (!programaAcademico.length) return res.status(404).json({ message: "Programa académico no encontrado" });
    const [result] = await db.query("DELETE FROM programaacademico WHERE idProgramaAcademico = ?", [idProgramaAcademico]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Programa académico no encontrado" });
    }
    res.json({ message: `'${programaAcademico[0].nombre}' eliminado correctamente` });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el programa académico", error: error.message });
  }
};
