import { db } from "../../db/connection.js";

// Obtener todos los grupos incluyendo periodo, programa académico, y el nombre completo del tutor
export const getGruposTodos = async (req, res) => {
  const { idPeriodo, idPrograma } = req.query; // Suponiendo que los IDs se pasan como parámetros de consulta
  try {
    let query = `SELECT g.*, p.periodo, 
    CONCAT(COALESCE(pa.Titulo_Tsu, ''), ' ', COALESCE(pa.Titulo_Ing, '')) AS programa_academico,
    CONCAT(tutor.nombre, ' ', tutor.apellido_paterno, ' ', tutor.apellido_materno) AS tutor
    FROM grupo g
    JOIN periodo p ON g.idPeriodo = p.id_periodo
    JOIN programaacademico pa ON g.idProgramaAcademico = pa.id_programa_academico
    JOIN persona tutor ON g.idTutor = tutor.id_persona`;
    const conditions = [];
    const params = [];
    // Agregar condiciones si idPeriodo y idPrograma están presentes
    if (idPeriodo) {
      conditions.push("g.idPeriodo = ?");
      params.push(idPeriodo);
    }
    if (idPrograma) {
      conditions.push("g.idProgramaAcademico = ?");
      params.push(idPrograma);
    }
    if (conditions.length) {
      query += ` WHERE ${conditions.join(" AND ")}`;
    }
    const [rows] = await db.query(query, params);
    // Manejo del estatus
    rows.forEach(element => {
      element['estatus'] = element['estatus'] === 1 ? 'Autorizado' : 'Planeado';
    });
    if (rows.length > 0) {
      res.status(200).json({ message: "Grupos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron los grupos" });
    }
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Crear un nuevo grupo
export const createGrupo = async (req, res) => {
  const { idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus } = req.body;
  if (!idPeriodo || !idProgramaAcademico || !idTutor || !nombre || !cuatrimestre || !estatus) {
    return res.status(400).json({ message: "Todos los campos son obligatorios" });
  }
  try {
    const query = `
      INSERT INTO grupo (idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
    `;
    await db.query(query, [idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus]);
    res.status(201).json({ message: "Grupo creado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el grupo", error: error.message });
  }
};

// Actualizar un grupo existente
export const updateGrupo = async (req, res) => {
  const { idGrupo } = req.params;
  const { idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus } = req.body;
  if (!idGrupo) {
    return res.status(400).json({ message: "El ID del grupo es obligatorio" });
  }
  try {
    const query = `UPDATE grupo SET idPeriodo = ?, idProgramaAcademico = ?, idTutor = ?, nombre = ?, cuatrimestre = ?, observacion = ?, estatus = ?
      WHERE idGrupo = ?`;
    const [result] = await db.query(query, [idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, idGrupo]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Grupo no encontrado" });
    }
    res.status(200).json({ message: "Grupo actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el grupo", error: error.message });
  }
};

// Eliminar un grupo
export const deleteGrupo = async (req, res) => {
    try {
      const { idGrupo } = req.params;
      const [grupo] = await db.query("SELECT nombre FROM grupo WHERE idGrupo = ?", [idGrupo]);
      if (!grupo.length) return res.status(404).json({ message: "Grupo no encontrado" });
      const [result] = await db.query("DELETE FROM grupo WHERE idGrupo = ?", [idGrupo]);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Grupo no encontrado" });
      }
      res.status(200).json({ message: `'${grupo[0].nombre}' eliminado correctamente` });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar el grupo", error: error.message });
    }
};
