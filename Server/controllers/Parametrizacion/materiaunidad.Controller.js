import { db } from "../../db/connection.js";

export const getMateriaUnidadtodos = async (req, res) => {
  try {
    const query = `SELECT 
      p.nombreOficial,
      mc.materia, 
      mc.cuatrimestre, 
      m.unidad, 
      m.idMateriaUnidad, 
      m.idMapaCurricular,
      m.nombre 
    FROM materiaunidad as m 
    INNER JOIN mapacurricular as mc on mc.idMapaCurricular = m.idMapaCurricular
    INNER JOIN programaacademico as p on p.idProgramaAcademico = mc.idProgramaAcademico;`;

    const [rows] = await db.query(query);

    if (rows.length > 0) {
      const result = rows.reduce((acc, row) => {
        const { nombreOficial, materia, cuatrimestre, unidad, idMateriaUnidad, idMapaCurricular, nombre } = row;
        
        const key = `${nombreOficial}-${materia}-${cuatrimestre}`;

        if (!acc[key]) {
          acc[key] = {
            nombreOficial,
            materia,
            cuatrimestre,
            idMateriaUnidad,
            idMapaCurricular,
            nombre: [],
            unidad: []
          };
        }

        acc[key].unidad.push(unidad);
        acc[key].nombre.push(nombre);

        return acc;
      }, {});

      // Convertir arreglos de unidad y nombre a cadenas de números y nombres separadas por comas, respectivamente
      const formattedResult = Object.values(result).map(item => ({
        ...item,
        unidad: item.unidad.join(', '),
        nombre: item.nombre.join(', ')
      }));

      res.json({
        message: "Materias y Unidades obtenidas correctamente",
        data: formattedResult
      });
    } else {
      res.status(404).json({ message: "No se encontraron materias y unidades" });
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

    // La columna 'unidad' es INT y se guarda UNA FILA POR UNIDAD, pero el formulario
    // permite capturar varias a la vez ("1,2,3"). Aqui se separan y se validan.
    const unidades = String(unidad)
      .split(",")
      .map(u => u.trim())
      .filter(u => u !== "");

    if (unidades.length === 0) {
      return res.status(400).json({ message: "Debes indicar al menos una unidad" });
    }
    const noNumericas = unidades.filter(u => !/^\d+$/.test(u));
    if (noNumericas.length > 0) {
      return res.status(400).json({
        message: `Las unidades deben ser numeros. Revisa: ${noNumericas.join(", ")}`
      });
    }
    const numeros = [...new Set(unidades.map(Number))]; // sin repetidos en la misma captura

    // No permitir unidades que ya existan para esa materia
    const [yaExisten] = await db.query(
      "SELECT unidad FROM materiaunidad WHERE idMapaCurricular = ? AND unidad IN (?)",
      [idMapaCurricular, numeros]
    );
    if (yaExisten.length > 0) {
      return res.status(400).json({
        message: `Esta materia ya tiene registrada(s) la(s) unidad(es): ${yaExisten.map(r => r.unidad).join(", ")}`
      });
    }

    // Insertar una fila por unidad
    const [rows] = await db.query(
      "INSERT INTO materiaunidad (idMapaCurricular, unidad, nombre) VALUES ?",
      [numeros.map(n => [idMapaCurricular, n, nombre])]
    );

    // Obtener el nombre del mapa curricular recién creado
    const [mapaCurricular] = await db.query("SELECT materia FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    res.status(201).json({
      message: `'${nombre}' creado correctamente (${numeros.length} unidad(es): ${numeros.join(", ")})`,
      idMateriaUnidad: rows.insertId,
      idMapaCurricular, unidades: numeros, nombre,
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
