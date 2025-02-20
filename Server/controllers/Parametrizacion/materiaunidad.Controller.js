import { db } from "../../db/connection.js";

export const getMateriaUnidadtodos = async (req, res) => {
  try {
    const query = `SELECT 
    p.nombre AS programaEducativo,
    mc.materia, 
    mc.cuatrimestre, 
    m.unidad, 
    m.nombre,
    m.*
    FROM ut2025.materiaunidad as m 
    INNER JOIN mapacurricular as mc on mc.idMapaCurricular = m.idMapaCurricular
    INNER JOIN programaacademico as p on p.idProgramaAcademico = mc.idProgramaAcademico;`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Materia Unidad obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron materias unidad" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
 
export const createMateriaUnidad = async (req, res) => {
  try {
    const { idMapaCurricular, unidad, nombre } = req.body;
    // Verificar que todos los campos requeridos estén presentes
    if (!idMapaCurricular || !unidad || !nombre) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idMapaCurricular, unidad, nombre" });
    }
    // Insertar la nueva Materia Unidad en la base de datos
    const [rows] = await db.query(
      "INSERT INTO materiaunidad (idMapaCurricular, unidad, nombre) VALUES (?, ?, ?)",
      [idMapaCurricular, unidad, nombre]
    );
    // Obtener el nombre del mapa curricular recién creado
    const [mapaCurricular] = await db.query("SELECT materia FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    res.status(201).json({
      message: `'${nombre}' creado correctamente`,
      idMateriaUnidad: rows.insertId,
      idMapaCurricular, unidad, nombre,
      materia: mapaCurricular[0].materia
    });
  } catch (error) {
    console.error("Error al crear Materia Unidad:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateMateriaUnidad = async (req, res) => {
  try {
    const { idMateriaUnidad } = req.params;
    const { idMapaCurricular, unidad, nombre } = req.body;
    // Verificar si la materia unidad existe
    const [exists] = await db.query("SELECT 1 FROM materiaunidad WHERE idMateriaUnidad = ?", [idMateriaUnidad]);
    if (!exists.length) {
      return res.status(404).json({ message: "La materia unidad no existe" });
    }
    // Realizar la actualización de la materia unidad
    const [result] = await db.query(
      "UPDATE materiaunidad SET idMapaCurricular = ?, unidad = ?, nombre = ? WHERE idMateriaUnidad = ?",
      [idMapaCurricular, unidad, nombre, idMateriaUnidad]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar la materia unidad" });
    }
    // Obtener el nombre del mapa curricular actualizado
    const [mapaCurricular] = await db.query("SELECT materia FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    res.status(200).json({
      message: `'${nombre}' actualizado correctamente`,
      idMateriaUnidad, idMapaCurricular, unidad, nombre,
      materia: mapaCurricular[0].materia
    });
  } catch (error) {
    console.error("Error al actualizar la materia unidad:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteMateriaUnidad = async (req, res) => {
  try {
    const { idMateriaUnidad } = req.params;
    // Verificar si la materia unidad existe
    const [materiaunidad] = await db.query("SELECT nombre FROM materiaunidad WHERE idMateriaUnidad = ?", [idMateriaUnidad]);
    if (!materiaunidad.length) 
      return res.status(404).json({message: "Materia Unidad no encontrada" });
    // Eliminar la materia unidad
    const [rows] = await db.query("DELETE FROM materiaunidad WHERE IdMateriaUnidad = ?", [idMateriaUnidad]);
    // Verificar si la eliminación se realizó correctamente
    rows.affectedRows
      ? res.status(200).json({ message: `'${materiaunidad[0].nombre}' eliminada correctamente` })
      : res.status(404).json({ message: "Materia Unidad no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
