import { db } from "../../db/connection.js";

export const getMapaCurriculartodos = async (req, res) => {
  try {
    const query = `
      SELECT m.*, 
      CONCAT(COALESCE(p.Titulo_Tsu, ''), ' ', COALESCE(p.Titulo_Ing, '')) AS Titulo
      FROM mapacurricular m
      JOIN programaacademico p ON m.id_programa_academico = p.id_programa_academico
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Mapa Curricular obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron mapas curriculares" });
    }
  } catch (error) {
    console.error("Error al obtener los mapas curriculares:", error);
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createMapaCurricular = async (req, res) => {
  try {
    const { id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio } = req.body;
    // Verificar que todos los campos requeridos estén presentes
    if (!id_programa_academico || !ciclo || !cuatrimestre || !materia || !clave || !h_semana || !h_teoricas || !h_practicas || !h_total || !creditos || !modalidad || !espacio) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio" });
    }
    // Insertar el nuevo Mapa Curricular en la base de datos
    const [rows] = await db.query(
      "INSERT INTO mapacurricular (id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio]
    );
    // Obtener el nombre del programa académico recién creado
    const [programa] = await db.query("SELECT CONCAT(Titulo_Tsu, ' ', Titulo_Ing) AS Programa_Academico FROM programaacademico WHERE id_programa_academico = ?", [id_programa_academico]);
    res.status(201).json({
      message: `'${materia}' creado correctamente`,
      id_mapa_curricular: rows.insertId,
      id_programa_academico,
      programa_academico: programa[0].Programa_Academico,
      ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio
    });
  } catch (error) {
    console.error("Error al crear mapa curricular:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateMapaCurricular = async (req, res) => {
  try {
    const { id_mapa_curricular } = req.params;
    const { id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio } = req.body;
    // Verificar si el mapa curricular existe
    const [exists] = await db.query("SELECT 1 FROM mapacurricular WHERE id_mapa_curricular = ?", [id_mapa_curricular]);
    if (!exists.length) {
      return res.status(404).json({ message: "El mapa curricular no existe" });
    }
    // Realizar la actualización del mapa curricular
    const [result] = await db.query(
      "UPDATE mapacurricular SET id_programa_academico = ?, ciclo = ?, cuatrimestre = ?, materia = ?, clave = ?, h_semana = ?, h_teoricas = ?, h_practicas = ?, h_total = ?, creditos = ?, modalidad = ?, espacio = ? WHERE id_mapa_curricular = ?",
      [id_programa_academico, ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio, id_mapa_curricular]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el mapa curricular" });
    }
    // Obtener el nombre del programa académico actualizado
    const [programa] = await db.query("SELECT CONCAT(Titulo_Tsu, ' ', Titulo_Ing) AS Programa_Academico FROM programaacademico WHERE id_programa_academico = ?", [id_programa_academico]);

    res.status(200).json({
      message: `'${materia}' actualizado correctamente`,
      id_mapa_curricular,
      id_programa_academico,
      programa_academico: programa[0].Programa_Academico,
      ciclo, cuatrimestre, materia, clave, h_semana, h_teoricas, h_practicas, h_total, creditos, modalidad, espacio
    });
  } catch (error) {
    console.error("Error al actualizar mapa curricular:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteMapaCurricular = async (req, res) => {
  try {
    const { id_mapa_curricular } = req.params;
    const [mapaCurricular] = await db.query("SELECT materia FROM mapacurricular WHERE id_mapa_curricular = ?", [id_mapa_curricular]);
    if (!mapaCurricular.length) 
      return res.status(404).json({message: "Mapa Curricular no encontrado" });
    const [rows] = await db.query("DELETE FROM mapacurricular WHERE id_mapa_curricular = ?", [id_mapa_curricular]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${mapaCurricular[0].materia}' eliminado correctamente` })
      : res.status(404).json({ message: "Mapa Curricular no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
