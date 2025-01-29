import { db } from "../../db/connection.js";

export const getKardex = async (req, res) => {
  try {
    const query = `
      SELECT k.*,
        pe.periodo AS periodo, 
        g.nombre AS grupo,
        mp.materia AS mapa,
        CONCAT(p.nombre, ' ', p.apellido_paterno, ' ', p.apellido_materno) AS nombre
      FROM integradora_se.kardex AS k
      INNER JOIN alumno_programa AS ap ON ap.idAlumnoPrograma = k.idAlumnoPrograma
      INNER JOIN alumno AS a ON a.id_alumno = ap.idAlumno
      INNER JOIN persona AS p ON p.id_persona = a.id_alumno
      INNER JOIN mapacurricular AS mp ON mp.id_mapa_curricular = k.id_mapa_curricular
      INNER JOIN grupo AS g ON g.idGrupo = k.idGrupo
      INNER JOIN periodo AS pe ON pe.id_periodo = k.id_periodo
    `;
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
  try {
    const { idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo } = req.body;

    if (!idAlumnoPrograma || !id_mapa_curricular || !idGrupo || !id_periodo || !CalificacionFinal || !Tipo) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    const [rows] = await db.query(
      "INSERT INTO kardex (idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo) VALUES (?, ?, ?, ?, ?, ?)",
      [idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo]
    );

    res.status(201).json({
      message: "Kardex creado correctamente",
      idKardex: rows.insertId,
      idAlumnoPrograma,
      id_mapa_curricular,
      idGrupo,
      id_periodo,
      CalificacionFinal,
      Tipo,
    });
  } catch (error) {
    console.error("Error al crear kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateKardex = async (req, res) => {
  try {
    const { IdKardex } = req.params;
    const { idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo } = req.body;

    const [exists] = await db.query("SELECT 1 FROM kardex WHERE IdKardex = ?", [IdKardex]);
    if (!exists.length) {
      return res.status(404).json({ message: "El kardex no existe" });
    }

    const [result] = await db.query(
      "UPDATE kardex SET idAlumnoPrograma = ?, id_mapa_curricular = ?, idGrupo = ?, id_periodo = ?, CalificacionFinal = ?, Tipo = ? WHERE IdKardex = ?",
      [idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo, IdKardex]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el kardex" });
    }

    res.status(200).json({
      message: "Kardex actualizado correctamente",
      IdKardex,
      idAlumnoPrograma,
      id_mapa_curricular,
      idGrupo,
      id_periodo,
      CalificacionFinal,
      Tipo
    });
  } catch (error) {
    console.error("Error al actualizar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteKardex = async (req, res) => {
  try {
    const { IdKardex } = req.params;

    const [kardex] = await db.query("SELECT idAlumnoPrograma FROM kardex WHERE IdKardex = ?", [IdKardex]);
    if (!kardex.length) {
      return res.status(404).json({ message: "Kardex no encontrado" });
    }

    const [rows] = await db.query("DELETE FROM kardex WHERE IdKardex = ?", [IdKardex]);
    if (rows.affectedRows > 0) {
      res.status(200).json({ message: `Kardex con IdKardex ${IdKardex} eliminado correctamente` });
    } else {
      res.status(404).json({ message: "No se pudo eliminar el kardex" });
    }
  } catch (error) {
    console.error("Error al eliminar el kardex:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
