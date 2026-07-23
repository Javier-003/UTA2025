import { db } from "../../db/connection.js";

// Obtener todos los mapas curriculares
export const getMapaCurriculartodos = async (req, res) => {
  try {
    const query = `SELECT mc.*, pa.nombreOficial AS carrera
                   FROM mapacurricular AS mc
                   JOIN programaacademico pa ON mc.idProgramaAcademico = pa.idProgramaAcademico`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Mapas curriculares obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron mapas curriculares" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Crear un mapa curricular
export const createMapaCurricular = async (req, res) => {
  try {
    const { idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad } = req.body;
    if (!idProgramaAcademico || !ciclo || !cuatrimestre || !materia || !clave || !horasSemana || !horasTeoricas || !horasPracticas || !horasTotal || !creditos || !modalidad || !espacio || !noUnidad) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // <-- CAMBIO: evitar duplicados por clave Y por programa + cuatrimestre + materia
    const [existsClave] = await db.query("SELECT 1 FROM mapacurricular WHERE clave = ?", [clave]);
    if (existsClave.length) {
      return res.status(400).json({ message: "Ya existe un mapa curricular con esa clave" });
    }
    const [existsMateria] = await db.query(
      "SELECT 1 FROM mapacurricular WHERE idProgramaAcademico = ? AND cuatrimestre = ? AND materia = ?",
      [idProgramaAcademico, cuatrimestre, materia]
    );
    if (existsMateria.length) {
      return res.status(400).json({ message: "Esa materia ya existe en ese programa y cuatrimestre" });
    }
    // <-- FIN DEL CAMBIO

    const [result] = await db.query("INSERT INTO mapacurricular (idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad]
    );
    res.status(201).json({
      message: `'${materia}' ha sido registrado`, idMapaCurricular: result.insertId,
      idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad
    });
  } catch (error) {
    console.error("Error al registrar el mapa curricular:", error);
    res.status(500).json({ message: "Error al registrar el mapa curricular", error: error.message });
  }
};
// Actualizar un mapa curricular
export const updateMapaCurricular = async (req, res) => {
  try {
    const { idMapaCurricular } = req.params;
    const { idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad } = req.body;
    const [result] = await db.query(
      "UPDATE mapacurricular SET idProgramaAcademico = ?, ciclo = ?, cuatrimestre = ?, materia = ?, clave = ?, horasSemana = ?, horasTeoricas = ?, horasPracticas = ?, horasTotal = ?, creditos = ?, modalidad = ?, espacio = ?, noUnidad = ? WHERE idMapaCurricular = ?",
      [idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, idMapaCurricular]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "El mapa curricular no existe" });
    }
    const [programaacademico] = await db.query("SELECT * FROM programaacademico WHERE idProgramaAcademico = ?", [idProgramaAcademico]);
    res.status(200).json({
      message: `'${materia}' ha sido actualizado`,
      idMapaCurricular, idProgramaAcademico,
      NombreProgramaAcademico: programaacademico[0].nombre,
      ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad
    });
  } catch (error) {
    console.error("Error al actualizar el mapa curricular:", error);
    res.status(500).json({ message: "Error al actualizar el mapa curricular" });
  }
};

// Eliminar un mapa curricular
export const deleteMapaCurricular = async (req, res) => {
  const conn = await db.getConnection();
  try {
    const { idMapaCurricular } = req.params;

    const [mc] = await conn.query("SELECT materia FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    if (!mc.length) { conn.release(); return res.status(404).json({ message: "El mapa curricular no existe" }); }

    // Proteger calificaciones: si hay kardex o evaluación, NO se borra
    const [[dep]] = await conn.query(`
      SELECT (SELECT COUNT(*) FROM kardex     WHERE idMapaCurricular = ?) AS kardex,
             (SELECT COUNT(*) FROM evaluacion WHERE idMapaCurricular = ?) AS evaluacion
    `, [idMapaCurricular, idMapaCurricular]);

    if (dep.kardex > 0 || dep.evaluacion > 0) {
      conn.release();
      return res.status(409).json({
        message: `No se puede eliminar '${mc[0].materia}': tiene ${dep.kardex} de kardex y ${dep.evaluacion} de evaluación (calificaciones) asociados.`
      });
    }

    // Borrado seguro en cadena (sin calificaciones de por medio)
    await conn.beginTransaction();
    await conn.query(`DELETE FROM horario
      WHERE idGrupoMateria IN (SELECT idGrupoMateria FROM grupomateria WHERE idMapaCurricular = ?)`, [idMapaCurricular]);
    await conn.query("DELETE FROM grupomateria  WHERE idMapaCurricular = ?", [idMapaCurricular]);
    await conn.query("DELETE FROM materiaunidad WHERE idMapaCurricular = ?", [idMapaCurricular]);
    await conn.query("DELETE FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    await conn.commit();

    res.status(200).json({ message: `'${mc[0].materia}' ha sido eliminado` });
  } catch (error) {
    await conn.rollback();
    console.error("Error al eliminar el mapa curricular:", error);
    res.status(500).json({ message: "Error al eliminar el mapa curricular" });
  } finally {
    conn.release();
  }
};
