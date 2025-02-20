import { db } from "../../db/connection.js";

// Obtener todas las materias
export const getCargaMaterias = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
          gm.idGrupoMateria,
          gm.tipo,
          gm.fecha,
          gm.idGrupo,
          gm.idProfesor,
          gm.idMapaCurricular,
          gm.idAula,
          g.nombre AS grupo,
          g.cuatrimestre,
          m.materia AS materia,
          m.clave AS claveMateria,
          m.horasSemana,
          m.modalidad,
          CONCAT(p.nombre, ' ', p.paterno, ' ', p.materno) AS profesor,
          pr.clave AS claveProfesor,
          a.nombre AS aula,
          a.tipo AS tipoAula,
          pe.periodo AS periodo,
          h.dia,
          b.idBloque,
          b.nombre AS bloque,
          b.horaInicio,
          b.horaFin,
          b.duracion
      FROM grupomateria AS gm
      INNER JOIN grupo AS g ON g.idGrupo = gm.idGrupo
      INNER JOIN periodo AS pe ON pe.idPeriodo = g.idPeriodo
      INNER JOIN mapacurricular AS m ON m.idMapaCurricular = gm.idMapaCurricular
      INNER JOIN profesor AS pr ON pr.idProfesor = gm.idProfesor
      INNER JOIN persona AS p ON p.idPersona = pr.idProfesor
      INNER JOIN aula AS a ON a.idAula = gm.idAula
      LEFT JOIN horario AS h ON h.idGrupoMateria = gm.idGrupoMateria
      LEFT JOIN bloque AS b ON b.idBloque = h.idBloque
      ORDER BY g.nombre, m.materia, h.dia, b.horaInicio;
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener la carga de materias:", error);
    res.status(500).json({ error: "Error al obtener la carga de materias" });
  }
};

// Crear una nueva carga de materia y asignar horarios
export const createCargaMaterias = async (req, res) => {
  try {
    console.log("Datos recibidos en el backend:", JSON.stringify(req.body, null, 2));

    // 🔹 Verificar si `idGrupo` está anidado
    let data = req.body;

    // 🔹 Extraer datos del cuerpo de la solicitud
    const { 
      idGrupo, 
      idProfesor, 
      idMapaCurricular, 
      idAula, 
      tipo, 
      fecha, 
      horarios 
    } = data.idGrupo && typeof data.idGrupo === "object" ? data.idGrupo : data;

    // 🔹 Log para verificar los valores
    console.log("Valores extraídos:", { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios });

    // 🔹 Insert en grupomateria
    const [result] = await db.query(`
      INSERT INTO grupomateria (idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha)
      VALUES (?, ?, ?, ?, ?, ?);
    `, [idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha]);

    const idGrupoMateria = result.insertId;

    // 🔹 Insert en horario si existen horarios
    if (horarios && horarios.length) {
      const values = horarios.map(horario => [idGrupoMateria, horario.idBloque, horario.dia]);

      console.log("Valores de horarios:", values); // Depuración

      // 🔹 Insert usando múltiples valores dinámicos
      const placeholders = values.map(() => "(?, ?, ?)").join(", ");
      const flattenedValues = values.flat();
      await db.query(`
          INSERT INTO horario (idGrupoMateria, idBloque, dia)
          VALUES ${placeholders};
      `, flattenedValues);
    }

    res.json({ message: "Carga de materias creada exitosamente", idGrupoMateria });
  } catch (error) {
    console.error("Error al crear la carga de materias:", error);
    res.status(500).json({ error: "Error al crear la carga de materias" });
  }
};




// Actualizar una carga de materias y sus horarios
export const updateCargaMaterias = async (req, res) => {
  try {
    const { idGrupoMateria } = req.params;
    const { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios } = req.body;

    console.log("Valores extraídos:", { idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios });

    // 🔹 Actualiza la carga de materias
    await db.query(`
      UPDATE grupomateria
      SET idGrupo = ?, idProfesor = ?, idMapaCurricular = ?, idAula = ?, tipo = ?, fecha = ?
      WHERE idGrupoMateria = ?;
    `, [idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, idGrupoMateria]);

    // 🔹 Actualiza horarios
    if (horarios && horarios.length) {
      // Limpiar horarios anteriores (puedes ajustar según tus necesidades)
      await db.query(`DELETE FROM horario WHERE idGrupoMateria = ?`, [idGrupoMateria]);

      // Insertar nuevos horarios
      const values = horarios.map(horario => [idGrupoMateria, horario.idBloque, horario.dia]);

      console.log("Valores de horarios:", values); // Depuración

      const placeholders = values.map(() => "(?, ?, ?)").join(", ");
      const flattenedValues = values.flat();
      await db.query(`
          INSERT INTO horario (idGrupoMateria, idBloque, dia)
          VALUES ${placeholders};
      `, flattenedValues);
    }

    res.json({ message: "Carga de materias actualizada exitosamente" });
  } catch (error) {
    console.error("Error al actualizar la carga de materias:", error);
    res.status(500).json({ error: "Error al actualizar la carga de materias" });
  }
};


// Eliminar una carga de materias
export const deleteCargaMaterias = async (req, res) => {
  const { idGrupoMateria } = req.params;
  try {
    await db.query(`
      DELETE FROM horario
      WHERE idGrupoMateria = ?;
    `, [idGrupoMateria]);
    await db.query(`
      DELETE FROM grupomateria
      WHERE idGrupoMateria = ?;
    `, [idGrupoMateria]);
    res.json({ message: "Carga de materias eliminada exitosamente", idGrupoMateria });
  } catch (error) {
    console.error("Error al eliminar la carga de materias:", error);
    res.status(500).json({ error: "Error al eliminar la carga de materias" });
  }
};