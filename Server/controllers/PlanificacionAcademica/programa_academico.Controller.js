import { db } from "../../db/connection.js";

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
  if (!idNivelEstudio || !idOfertaAcademica || !nombre || !nombreOficial || !descripcion || !sigla || !anio || !totalPeriodos || !totalCreditos || !desde || !hasta || !estatus) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const query = `
      INSERT INTO programaacademico (idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    await db.query(query, [idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus]);
    res.status(201).json({ message: "Programa académico creado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el programa académico", error: error.message });
  }
};

//actualizar un programa academico
export const updateProgramaAcademico = async (req, res) => {
  const { idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus } = req.body;
  if (!idProgramaAcademico || !idNivelEstudio || !idOfertaAcademica || !nombre || !nombreOficial || !descripcion || !sigla || !anio || !totalPeriodos || !totalCreditos || !desde || !hasta || !estatus) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const query = `
      UPDATE programaacademico
      SET idNivelEstudio = ?, idOfertaAcademica = ?, nombre = ?, nombreOficial = ?, descripcion = ?, sigla = ?, anio = ?, totalPeriodos = ?, totalCreditos = ?, desde = ?, hasta = ?, estatus = ?
      WHERE idProgramaAcademico = ?
    `;
    await db.query(query, [idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus, idProgramaAcademico]);
    res.json({ message: "Programa académico actualizado correctamente" });
  } catch (error) {
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