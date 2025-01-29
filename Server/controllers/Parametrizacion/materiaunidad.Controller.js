import { db } from "../../db/connection.js";

export const getMateriaUnidadtodos = async (req, res) => {
  try {
    const query = `
      SELECT mu.*,
             mc.materia,mc.cuatrimestre,
             mc.materia AS mapa,
             CASE 
               WHEN mc.cuatrimestre BETWEEN 1 AND 5 THEN pa.Titulo_Tsu
               WHEN mc.cuatrimestre BETWEEN 6 AND 10 THEN pa.Titulo_Ing
             END AS Programa_Educativo
      FROM materiaunidad mu
      JOIN mapacurricular mc ON mu.id_mapa_curricular = mc.id_mapa_curricular
      JOIN programaacademico pa ON mc.id_programa_academico = pa.id_programa_academico
    `;
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
    const { id_mapa_curricular, Unidad, Nombre } = req.body;
    // Verificar que todos los campos requeridos estén presentes
    if (!id_mapa_curricular || !Unidad || !Nombre) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_mapa_curricular, Unidad, Nombre" });
    }
    // Insertar la nueva Materia Unidad en la base de datos
    const [rows] = await db.query(
      "INSERT INTO materiaunidad (id_mapa_curricular, Unidad, Nombre) VALUES (?, ?, ?)",
      [id_mapa_curricular, Unidad, Nombre]
    );
    // Obtener el nombre del mapa curricular recién creado
    const [mapaCurricular] = await db.query("SELECT materia FROM mapacurricular WHERE id_mapa_curricular = ?", [id_mapa_curricular]);
    res.status(201).json({
      message: `'${Nombre}' creado correctamente`,
      IdMateriaUnidad: rows.insertId,
      id_mapa_curricular,Unidad,Nombre,
      materia: mapaCurricular[0].materia
    });
  } catch (error) {
    console.error("Error al crear Materia Unidad:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateMateriaUnidad = async (req, res) => {
  try {
    const { IdMateriaUnidad } = req.params;
    const { id_mapa_curricular, Unidad, Nombre } = req.body;
    // Verificar si la materia unidad existe
    const [exists] = await db.query("SELECT 1 FROM materiaunidad WHERE IdMateriaUnidad = ?", [IdMateriaUnidad]);
    if (!exists.length) {
      return res.status(404).json({ message: "La materia unidad no existe" });
    }
    // Realizar la actualización de la materia unidad
    const [result] = await db.query(
      "UPDATE materiaunidad SET id_mapa_curricular = ?, Unidad = ?, Nombre = ? WHERE IdMateriaUnidad = ?",
      [id_mapa_curricular, Unidad, Nombre, IdMateriaUnidad]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar la materia unidad" });
    }
    // Obtener el nombre del mapa curricular actualizado
    const [mapaCurricular] = await db.query("SELECT materia FROM mapacurricular WHERE id_mapa_curricular = ?", [id_mapa_curricular]);
    res.status(200).json({
      message: `'${Nombre}' actualizado correctamente`,
      IdMateriaUnidad,id_mapa_curricular,Unidad,Nombre,
      materia: mapaCurricular[0].materia
    });
  } catch (error) {
    console.error("Error al actualizar la materia unidad:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteMateriaUnidad = async (req, res) => {
  try {
    const { IdMateriaUnidad } = req.params;
    // Verificar si la materia unidad existe
    const [materiaunidad] = await db.query("SELECT Nombre FROM materiaunidad WHERE IdMateriaUnidad = ?", [IdMateriaUnidad]);
    if (!materiaunidad.length) 
      return res.status(404).json({message: "Materia Unidad no encontrada" });
    // Eliminar la materia unidad
    const [rows] = await db.query("DELETE FROM materiaunidad WHERE IdMateriaUnidad = ?", [IdMateriaUnidad]);
    // Verificar si la eliminación se realizó correctamente
    rows.affectedRows
      ? res.status(200).json({ message: `'${materiaunidad[0].Nombre}' eliminada correctamente` })
      : res.status(404).json({ message: "Materia Unidad no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
