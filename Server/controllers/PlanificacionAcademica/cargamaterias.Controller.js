import { db } from "../../db/connection.js";
export const getCargaMaterias = async (req, res) => {
  try {
    const query = `
      SELECT cm.*, 
      g.nombre AS grupo,
      m.materia AS materia, 
      CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS profesor,
      CONCAT(pac.Titulo_tsu, ' ', pac.Titulo_Ing) AS programa,
      h.dia AS dia,
      b.Nombre AS hora,
      pe.periodo AS periodo 

      FROM integradora_se.grupomateria AS cm
    INNER JOIN grupo AS g ON g.idGrupo = cm.id_grupo
    INNER JOIN periodo AS pe ON pe.id_periodo = g.idPeriodo 
    INNER JOIN mapacurricular AS m ON m.id_mapa_curricular = cm.idMapaCurricular
    INNER JOIN programaacademico AS pac ON pac.id_programa_academico = m.id_programa_academico 
    INNER JOIN profesor AS pr ON pr.id_profesor = cm.idProfesor
    INNER JOIN persona AS p ON p.id_persona = pr.id_profesor
    JOIN horario h ON cm.id_grupo_materia = h.idGrupoMateria
    Join bloque b ON h.id_Bloque = b.idBloque

    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Carga Materias obtenidas correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron datos" });
    }
  } catch (error) {
    console.error("Error al obtener las Carga Materias:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createCargaMaterias = async (req, res) => {
  try {
    const {id_grupo, idMapaCurricular, tipo, fecha, idProfesor} = req.body;

    if (!id_grupo || !idMapaCurricular || !tipo || !idProfesor) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const [rows] = await db.query(
      "INSERT INTO grupomateria (id_grupo, idMapaCurricular, tipo, fecha, idProfesor) VALUES (?, ?, ?, NOW(), ?)",
      [id_grupo, idMapaCurricular, tipo, fecha, idProfesor]
    );

    res.status(201).json({
      message: "Carga Materias creada correctamente",
      idCargaMaterias: rows.insertId,
      id_grupo,
      idMapaCurricular,
      tipo, 
      fecha: new Date().toISOString().slice(0, 10), // Fecha de registro actual formateada
      idProfesor,
    });
  } catch (error) {
    console.error("Error al crear Carga Materias:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
}

export const updateCargaMaterias = async (req, res) => {
    try {
        const { id_grupo, idMapaCurricular, tipo, idProfesor } = req.body;
        const { id_grupo_materia } = req.params;
    
        if (!id_grupo || !idMapaCurricular || !tipo || !idProfesor) {
        return res.status(400).json({ message: "Todos los campos son requeridos" });
        }
    
        const [rows] = await db.query(
        "UPDATE grupomateria SET id_grupo = ?, idMapaCurricular = ?, tipo = ?, idProfesor = ? WHERE id_grupo_materia = ?",
        [id_grupo, idMapaCurricular, tipo, fecha, idProfesor, id_grupo_materia]
        );
    
        if (rows.affectedRows > 0) {
        res.json({ message: "Carga Materias actualizada correctamente" });
        } else {
        res.status(404).json({ message: "Carga Materias no encontrada" });
        }
    } catch (error) {
        console.error("Error al actualizar Carga Materias:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
}

export const deleteCargaMaterias = async (req, res) => {
    try {
        const { id_grupo_materia } = req.params;
    
        const [rows] = await db.query("DELETE FROM grupomateria WHERE id_grupo_materia = ?", [id_grupo_materia]);
    
        if (rows.affectedRows > 0) {
        res.json({ message: "Carga Materias eliminada correctamente" });
        } else {
        res.status(404).json({ message: "Carga Materias no encontrada" });
        }
    } catch (error) {
        console.error("Error al eliminar Carga Materias:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
}
