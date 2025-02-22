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
    const [exists] = await db.query("SELECT * FROM mapacurricular WHERE clave = ?", [clave]);
    if (exists.length) {
      return res.status(400).json({ message: "El mapa curricular ya existe" });
    }
    const [result] = await db.query("INSERT INTO mapacurricular (idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)",
       [idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad]
      ); 
      res.status(201).json({
        message: `'${materia}' ha sido registrado`, idMapaCurricular: result.insertId,
        idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad
      });
  } catch (error) {
    console.error("Error al registrar el mapa curricular:", error);
    res.status(500).json({ message: "Error al registrar el mapa curricular", error: error.message});
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
  try {
    const { idMapaCurricular } = req.params;
    const [mapacurricular] = await db.query("SELECT materia FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    if (!mapacurricular.length) {
      return res.status(404).json({ message: "El mapa curricular no existe" });
    }
    const [rows] = await db.query("DELETE FROM mapacurricular WHERE idMapaCurricular = ?", [idMapaCurricular]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${mapacurricular[0].materia}' ha sido eliminado` })
      : res.status(400).json({ message: "No se eliminó ningún mapa curricular" });
  } catch (error) {
    console.error("Error al eliminar el mapa curricular:", error);
    res.status(500).json({ message: "Error al eliminar el mapa curricular" });
  }
};