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
          b.duracion,
          pa.idProgramaAcademico,
          pa.nombreOficial AS nombreOficial
      FROM grupomateria AS gm
      INNER JOIN grupo AS g ON g.idGrupo = gm.idGrupo
      INNER JOIN periodo AS pe ON pe.idPeriodo = g.idPeriodo
      INNER JOIN mapacurricular AS m ON m.idMapaCurricular = gm.idMapaCurricular
      INNER JOIN profesor AS pr ON pr.idProfesor = gm.idProfesor
      INNER JOIN persona AS p ON p.idPersona = pr.idProfesor
      INNER JOIN aula AS a ON a.idAula = gm.idAula
      INNER JOIN programaacademico AS pa ON pa.idProgramaAcademico = m.idProgramaAcademico
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
    let data = req.body;
    const { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios } = data.idGrupo && typeof data.idGrupo === "object" ? data.idGrupo : data;
    console.log("Valores extraídos:", { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios });

    // Verificar si algún horario ya está asignado
    if (horarios && horarios.length) {
      for (const horario of horarios) {
        const [existeHorario] = await db.query(
          `SELECT h.idGrupoMateria, g.nombre AS grupo, m.materia, b.nombre AS nombreBloque 
           FROM horario h
           INNER JOIN grupomateria gm ON gm.idGrupoMateria = h.idGrupoMateria
           INNER JOIN grupo g ON g.idGrupo = gm.idGrupo
           INNER JOIN mapacurricular m ON m.idMapaCurricular = gm.idMapaCurricular
           INNER JOIN bloque b ON b.idBloque = h.idBloque
           WHERE g.idGrupo = ? AND h.dia = ? AND h.idBloque = ?`,
          [idGrupo, horario.dia, horario.idBloque]
        );

        if (existeHorario.length > 0) {
          return res.status(400).json({ 
            error: `⚠️ El horario ${horario.dia}, bloque ${existeHorario[0].nombreBloque} ya está ocupado por la materia ${existeHorario[0].materia} en el grupo ${existeHorario[0].grupo}.` 
          });
        }

        // Verificar si el aula ya está asignada a otro bloque en el mismo horario
        const [existeAula] = await db.query(
          `SELECT h.idGrupoMateria, a.nombre AS aula, b.nombre AS nombreBloque 
           FROM horario h
           INNER JOIN grupomateria gm ON gm.idGrupoMateria = h.idGrupoMateria
           INNER JOIN aula a ON a.idAula = gm.idAula
           INNER JOIN bloque b ON b.idBloque = h.idBloque
           WHERE gm.idAula = ? AND h.dia = ? AND h.idBloque = ?`,
          [idAula, horario.dia, horario.idBloque]
        );

        if (existeAula.length > 0) {
          return res.status(400).json({ 
            error: `⚠️ El aula ${existeAula[0].aula} ya está asignada al bloque ${existeAula[0].nombreBloque} en el horario ${horario.dia}.` 
          });
        }
      }
    }

    // Verificar si hay horarios duplicados en la solicitud
    const uniqueHorarios = new Set(horarios.map(h => `${h.dia}-${h.idBloque}`));
    if (uniqueHorarios.size !== horarios.length) {
      return res.status(400).json({ error: "⚠️ No se pueden asignar horarios duplicados con el mismo bloque." });
    }

    // Verificar si la materia ya está asignada en el mismo grupo con otro profesor
    const [existeMateria] = await db.query(
      `SELECT gm.idGrupoMateria, g.nombre AS grupo, m.materia, CONCAT(p.nombre, ' ', p.paterno, ' ', p.materno) AS profesor
       FROM grupomateria gm
       INNER JOIN grupo g ON g.idGrupo = gm.idGrupo
       INNER JOIN mapacurricular m ON m.idMapaCurricular = gm.idMapaCurricular
       INNER JOIN profesor pr ON pr.idProfesor = gm.idProfesor
       INNER JOIN persona p ON p.idPersona = pr.idProfesor
       WHERE gm.idGrupo = ? AND gm.idMapaCurricular = ? AND gm.idProfesor != ?`,
      [idGrupo, idMapaCurricular, idProfesor]
    );

    if (existeMateria.length > 0) {
      return res.status(400).json({
        error: `⚠️ La materia ${existeMateria[0].materia} ya está asignada en el grupo ${existeMateria[0].grupo} con el profesor ${existeMateria[0].profesor}.`
      });
    }

    // Insertar en `grupomateria`
    const [result] = await db.query(`
      INSERT INTO grupomateria (idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha)
      VALUES (?, ?, ?, ?, ?, ?);
    `, [idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha]);

    const idGrupoMateria = result.insertId;

    // Insertar en `horario` solo si no hubo conflictos
    if (horarios && horarios.length) {
      const values = horarios.map(horario => [idGrupoMateria, horario.idBloque, horario.dia]);
      console.log("Valores de horarios:", values);

      const placeholders = values.map(() => "(?, ?, ?)").join(", ");
      const flattenedValues = values.flat();
      await db.query(`
          INSERT INTO horario (idGrupoMateria, idBloque, dia)
          VALUES ${placeholders};
      `, flattenedValues);
    }

    res.json({ message: "✅ Carga de materias creada exitosamente", idGrupoMateria });

  } catch (error) {
    console.error("❌ Error al crear la carga de materias:", error);
    res.status(500).json({ error: "Error al crear la carga de materias" });
  }
};

// Actualizar una carga de materias y sus horarios
export const updateCargaMaterias = async (req, res) => {
  try {
    const { idGrupoMateria } = req.params;
    const { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios } = req.body;
    console.log("Valores recibidos para actualizar:", { idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios });

    // Verificar si los nuevos horarios generan conflicto
    if (horarios && horarios.length) {
      for (const horario of horarios) {
        const [existeHorario] = await db.query(
          `SELECT h.idGrupoMateria, g.nombre AS grupo, m.materia, b.nombre AS nombreBloque 
           FROM horario h
           INNER JOIN grupomateria gm ON gm.idGrupoMateria = h.idGrupoMateria
           INNER JOIN grupo g ON g.idGrupo = gm.idGrupo
           INNER JOIN mapacurricular m ON m.idMapaCurricular = gm.idMapaCurricular
           INNER JOIN bloque b ON b.idBloque = h.idBloque
           WHERE g.idGrupo = ? 
           AND h.dia = ? 
           AND h.idBloque = ? 
           AND h.idGrupoMateria != ?`, 
          [idGrupo, horario.dia, horario.idBloque, idGrupoMateria]
        );

        if (existeHorario.length > 0) {
          return res.status(400).json({ 
            error: `⚠️ No se puede actualizar: el horario ${horario.dia}, bloque ${existeHorario[0].nombreBloque} ya está ocupado por la materia ${existeHorario[0].materia} en el grupo ${existeHorario[0].grupo}.`
          });
        }

        // Verificar si el aula ya está asignada a otro bloque en el mismo horario
        const [existeAula] = await db.query(
          `SELECT h.idGrupoMateria, a.nombre AS aula, b.nombre AS nombreBloque 
           FROM horario h
           INNER JOIN grupomateria gm ON gm.idGrupoMateria = h.idGrupoMateria
           INNER JOIN aula a ON a.idAula = gm.idAula
           INNER JOIN bloque b ON b.idBloque = h.idBloque
           WHERE gm.idAula = ? AND h.dia = ? AND h.idBloque = ? AND h.idGrupoMateria != ?`,
          [idAula, horario.dia, horario.idBloque, idGrupoMateria]
        );

        if (existeAula.length > 0) {
          return res.status(400).json({ 
            error: `⚠️ El aula ${existeAula[0].aula} ya está asignada al bloque ${existeAula[0].nombreBloque} en el horario ${horario.dia}.` 
          });
        }
      }
    }

    // Verificar si hay horarios duplicados en la solicitud
    const uniqueHorarios = new Set(horarios.map(h => `${h.dia}-${h.idBloque}`));
    if (uniqueHorarios.size !== horarios.length) {
      return res.status(400).json({ error: "⚠️ No se pueden asignar horarios duplicados con el mismo bloque." });
    }

    // Verificar si la materia ya está asignada en el mismo grupo con otro profesor
    const [existeMateria] = await db.query(
      `SELECT gm.idGrupoMateria, g.nombre AS grupo, m.materia, CONCAT(p.nombre, ' ', p.paterno, ' ', p.materno) AS profesor
       FROM grupomateria gm
       INNER JOIN grupo g ON g.idGrupo = gm.idGrupo
       INNER JOIN mapacurricular m ON m.idMapaCurricular = gm.idMapaCurricular
       INNER JOIN profesor pr ON pr.idProfesor = gm.idProfesor
       INNER JOIN persona p ON p.idPersona = pr.idProfesor
       WHERE gm.idGrupo = ? AND gm.idMapaCurricular = ? AND gm.idProfesor != ? AND gm.idGrupoMateria != ?`,
      [idGrupo, idMapaCurricular, idProfesor, idGrupoMateria]
    );

    if (existeMateria.length > 0) {
      return res.status(400).json({
        error: `⚠️ La materia ${existeMateria[0].materia} ya está asignada en el grupo ${existeMateria[0].grupo} con el profesor ${existeMateria[0].profesor}.`
      });
    }

    // Actualizar los datos de la carga de materias
    await db.query(`
      UPDATE grupomateria
      SET idGrupo = ?, idProfesor = ?, idMapaCurricular = ?, idAula = ?, tipo = ?, fecha = ?
      WHERE idGrupoMateria = ?;
    `, [idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, idGrupoMateria]);

    // Actualizar horarios
    if (horarios && horarios.length) {
      // Primero, eliminamos los horarios actuales
      await db.query(`DELETE FROM horario WHERE idGrupoMateria = ?`, [idGrupoMateria]);

      // Insertar los nuevos horarios
      const values = horarios.map(horario => [idGrupoMateria, horario.idBloque, horario.dia]);
      console.log("Valores de horarios a actualizar:", values);

      const placeholders = values.map(() => "(?, ?, ?)").join(", ");
      const flattenedValues = values.flat();
      await db.query(`
          INSERT INTO horario (idGrupoMateria, idBloque, dia)
          VALUES ${placeholders};
      `, flattenedValues);
    }

    res.json({ message: "✅ Carga de materias actualizada exitosamente" });

  } catch (error) {
    console.error("❌ Error al actualizar la carga de materias:", error);
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