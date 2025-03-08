import { db } from "../../db/conexion.js";

export const getKardex = async (req, res) => {
  try {
    const query = `SELECT k.*, 
    ap.matricula, 
    pe.periodo, 
    pa.nombreOficial, 
    g.nombre AS grupo, 
    mp.materia AS mapa, 
    mp.clave, 
    mp.cuatrimestre, 
    p.nombre, 
    p.paterno AS paterno, 
    p.materno AS materno
    FROM kardex AS k
    INNER JOIN alumnopa AS ap ON ap.idAlumnoPA = k.idAlumnoPA
    INNER JOIN alumno AS a ON a.idAlumno = ap.idAlumno
    INNER JOIN persona AS p ON p.idPersona = a.idAlumno
    INNER JOIN mapacurricular AS mp ON mp.idMapaCurricular = k.idmapacurricular
    INNER JOIN grupo AS g ON g.idGrupo = k.idGrupo
    INNER JOIN periodo AS pe ON pe.idPeriodo = k.idPeriodo
    INNER JOIN programaacademico AS pa ON pa.idProgramaAcademico = ap.idProgramaAcademico;`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Kardex obtenido correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener los kardexs:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};



export const createKardex = async (req, res) => {
  const { idAlumnoPA, idGrupo, tipo, estatus } = req.body; // 👈 Recibimos solo estos campos
  let connection;

  try {
    // 1. Obtener una conexión a la base de datos
    connection = await db.getConnection(); // 👈 Usas db.getConnection()
    await connection.beginTransaction(); // 👈 Iniciar transacción

    // 2. Obtener el idPeriodo desde la tabla grupo
    const [grupoRows] = await connection.query(
      "SELECT idPeriodo FROM grupo WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoRows.length === 0) {
      throw new Error("Grupo no encontrado");
    }

    const idPeriodo = grupoRows[0].idPeriodo; // 👈 idPeriodo obtenido

    // 3. Insertar en la tabla alumnoperiodo
    await connection.query(
      "INSERT INTO alumnoperiodo (idAlumnoPA, idPeriodo, Observacion) VALUES (?, ?, ?)",
      [idAlumnoPA, idPeriodo, "Dato ingresado automáticamente"] // 👈 Observación opcional
    );

    // 4. Obtener todos los idMapaCurricular asociados al idGrupo
    const [grupoMateriaRows] = await connection.query(
      "SELECT idMapaCurricular FROM grupomateria WHERE idGrupo = ?",
      [idGrupo]
    );

    if (grupoMateriaRows.length === 0) {
      throw new Error("No se encontraron materias para el grupo seleccionado");
    }

    // 5. Insertar en kardex por cada idMapaCurricular y obtener el idKardex
    for (const materia of grupoMateriaRows) {
      const { idMapaCurricular } = materia;

      // Insertar en kardex
      const [kardexResult] = await connection.query(
        "INSERT INTO kardex (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, null, tipo, estatus] // 👈 calificacionFinal es null por defecto
      );

      const idKardex = kardexResult.insertId; // 👈 idKardex generado

      // 6. Obtener las unidades de la materia (materiaunidad)
      const [materiaUnidadRows] = await connection.query(
        "SELECT idMateriaUnidad, nombre FROM materiaunidad WHERE idMapaCurricular = ?",
        [idMapaCurricular]
      );

      if (materiaUnidadRows.length === 0) {
        console.warn(`No se encontraron unidades para la materia con idMapaCurricular: ${idMapaCurricular}`);
        continue; // 👈 Continuar con la siguiente materia si no hay unidades
      }

      // 7. Insertar en evaluacion por cada unidad de la materia
      for (const unidad of materiaUnidadRows) {
        const { idMateriaUnidad, nombre } = unidad;

        await connection.query(
          "INSERT INTO evaluacion (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [idKardex, idMapaCurricular, idMateriaUnidad, null, null, nombre, "Abierto"] // 👈 calificacion y faltas son null por defecto
        );
      }
    }

    // 8. Confirmar la transacción
    await connection.commit();
    res.status(201).json({ message: "Kardex, alumnoperiodo y evaluaciones creados correctamente" });
  } catch (error) {
    // 9. Revertir la transacción en caso de error
    if (connection) {
      await connection.rollback();
    }
    console.error("Error al crear kardex, alumnoperiodo y evaluaciones:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  } finally {
    // 10. Liberar la conexión
    if (connection) {
      connection.release();
    }
  }
};


export const updateKardex = async (req, res) => {
  try {
    const { idKardex } = req.params;
    const { idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus } = req.body;
    const [exists] = await db.query("SELECT 1 FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!exists.length) {
      return res.status(404).json({ message: "El kardex no existe" });
    }
    const [result] = await db.query(
      "UPDATE kardex SET idAlumnoPA = ?, idMapaCurricular = ?, idGrupo = ?, idPeriodo = ?, calificacionFinal = ?, tipo = ?, estatus = ?  WHERE idKardex = ?",
      [idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus, idKardex]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el kardex" });
    }
    res.status(200).json({
      message: "Kardex actualizado correctamente",
      idKardex,idAlumnoPA,idMapaCurricular,idGrupo,idPeriodo,calificacionFinal, tipo, estatus
    });
  } catch (error) {
    console.error("Error al actualizar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteKardex = async (req, res) => {
  try {
    const { idKardex } = req.params;
    const [kardex] = await db.query("SELECT idAlumnoPA FROM kardex WHERE idKardex = ?", [idKardex]);
    if (!kardex.length) return res.status(404).json({ message: "Kardex no encontrado" });
    const [rows] = await db.query("DELETE FROM kardex WHERE idKardex = ?", [idKardex]);
    rows.affectedRows
      ? res.status(200).json({ message: `Kardex con idKardex ${idKardex} eliminado correctamente` })
      : res.status(404).json({ message: "Kardex no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
