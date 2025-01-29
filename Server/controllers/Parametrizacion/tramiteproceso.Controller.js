import { db } from "../../db/connection.js";

export const getTramiteProcesotodos = async (req, res) => {
  try {
    const query = `
    SELECT 
    tp.idTramiteProceso, 
    tp.idTramite,
    tp.idActividad,
    tp.objeto, 
    tp.orden,  
    t.nombre AS NombreTramite, 
    a.nombre AS NombreActividad
    FROM tramiteproceso tp
    JOIN tramite t ON tp.idTramite = t.idTramite
    JOIN actividad a ON tp.idActividad = a.idActividad
    ORDER BY tp.idTramiteProceso, tp.idTramite, tp.idActividad, tp.orden;`;    
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      const data = rows.map(row => ({
        idTramiteProceso: row.idTramiteProceso,
        idTramite: row.idTramite,
        NombreTramite: row.NombreTramite,
        idActividad: row.idActividad,
        NombreActividad: row.NombreActividad,
        objeto: row.objeto,
        orden: row.orden
      }));
      res.json({ message: "Trámites en proceso obtenidos correctamente", data });
    } else {
      res.status(404).json({ message: "No se encontraron trámites en proceso" });
    }
  } catch (error) {
    console.error("Error al obtener los trámites en proceso:", error);
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};


export const createTramiteProceso = async (req, res) => {
  try {
    const { idTramite, idActividad, objeto = null, orden } = req.body;

    if (!idTramite || !idActividad || orden === undefined) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idTramite, idActividad, objeto, orden" });
    }

    // Insertar trámite proceso en la base de datos
    const [rows] = await db.query(
      "INSERT INTO tramiteproceso (idTramite, idActividad, objeto, orden) VALUES (?, ?, ?, ?)",
      [idTramite, idActividad, objeto, orden]
    );

    // Obtener los nombres del trámite y la actividad recién creados
    const [tramite] = await db.query("SELECT nombre FROM tramite WHERE idTramite = ?", [idTramite]);
    const [actividad] = await db.query("SELECT nombre FROM actividad WHERE idActividad = ?", [idActividad]);

    // Verificar si se encontraron los nombres
    const NombreTramite = tramite.length ? tramite[0].nombre : "Desconocido";
    const NombreActividad = actividad.length ? actividad[0].nombre : "Desconocido";

    res.status(201).json({
      message: `'${objeto}' creado`,
      idTramiteProceso: rows.insertId,
      idTramite,
      NombreTramite,
      idActividad,
      NombreActividad,
      objeto,
      orden
    });

  } catch (error) {
    console.error("Error al crear el trámite en proceso:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};



export const updateTramiteProceso = async (req, res) => {
  try {
    const { idTramiteProceso } = req.params;
    const { idTramite, idActividad, objeto = null, orden } = req.body;

    if (!idTramite || !idActividad || orden === undefined) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idTramite, idActividad, objeto, orden" });
    }
    const [exists] = await db.query("SELECT 1 FROM tramiteproceso WHERE idTramiteProceso = ?", [idTramiteProceso]);
    if (!exists.length) {
      return res.status(404).json({ message: "El trámite en proceso no existe" });
    }
    const [result] = await db.query(
      "UPDATE tramiteproceso SET idTramite = ?, idActividad = ?, objeto = ?, orden = COALESCE(?, orden) WHERE idTramiteProceso = ?",
      [parseInt(idTramite), parseInt(idActividad), objeto, parseInt(orden), idTramiteProceso]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el trámite en proceso" });
    }
    // Obtener el nombre del trámite y la actividad actualizados
    const [tramite] = await db.query("SELECT Nombre FROM tramite WHERE idTramite = ?", [idTramite]);
    const [actividad] = await db.query("SELECT Nombre FROM actividad WHERE idActividad = ?", [idActividad]);
    res.status(200).json({
      message: "Trámite en proceso actualizado correctamente",
      data: {
        idTramiteProceso,
        idTramite,
        NombreTramite: tramite[0].nombre,
        idActividad,
        NombreActividad: actividad[0].nombre,
        objeto,
        orden
      },
    });
  } catch (error) {
    console.error("Error al actualizar el trámite en proceso:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteTramiteProceso = async (req, res) => {
  try {
    const { idTramiteProceso } = req.params;
    const [tramiteproceso] = await db.query("SELECT idTramiteProceso FROM tramiteproceso WHERE idTramiteProceso = ?", [idTramiteProceso]);
    if (!tramiteproceso.length) return res.status(404).json({ message: "Trámite Proceso no encontrado" });
    const [rows] = await db.query("DELETE FROM tramiteproceso WHERE idTramiteProceso = ?", [idTramiteProceso]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${tramiteproceso[0].idTramiteProceso}' eliminado correctamente` })
      : res.status(404).json({ message: "Trámite Proceso no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
