import { db } from "../../db/connection.js";

// Obtener todos los periodos
export const getPeriodotodos = async (req, res) => {
  try {
    const query = `
      SELECT p.id_periodo, p.periodo, p.fecha_inicio, p.fecha_fin,p.estado, p.fecha_registro, p.id_usuario 
      FROM periodo p 
      ORDER BY p.id_periodo;
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({
        message: "Periodos obtenidos correctamente",
        data: rows
      });
    } else {
      res.status(404).json({ message: "No se encontraron periodos" });
    }
  } catch (error) {
    console.error("Error al obtener los periodos:", error);
    res.status(500).json({
      message: "Algo salió mal al obtener los periodos",
      error: error.message
    });
  }
};

export const createPeriodo = async (req, res) => {
  try {
    const { periodo, fecha_inicio, fecha_fin, estado } = req.body;    
    // Verificación de campos requeridos
    if (!periodo || !fecha_inicio || !fecha_fin || !estado) {
      return res.status(400).json({ message: "Todos los campos son requeridos: periodo, fecha_inicio, fecha_fin, estado" });
    }
    // Insertar periodo en la base de datos
    const [rows] = await db.query(
      "INSERT INTO periodo (periodo, fecha_inicio, fecha_fin, estado, fecha_registro) VALUES (?, ?, ?, ?, NOW())",
      [periodo, fecha_inicio, fecha_fin, estado]
    );
    // Responder con el periodo creado
    res.status(201).json({
      message: `'${periodo}' creado`,
      id_periodo: rows.insertId,
      periodo,
      fecha_inicio,
      fecha_fin,
      estado,
      fecha_registro: new Date().toISOString().slice(0, 10), // Fecha de registro actual formateada
    });
  } catch (error) {
    console.error("Error al crear periodo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updatePeriodo = async (req, res) => {
  try {
    const { id_periodo } = req.params; // El id se pasa como parámetro en la URL
    const { periodo, fecha_inicio, fecha_fin, estado } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud    
    // Verifica si el periodo existe
    const [exists] = await db.query("SELECT 1 FROM periodo WHERE id_periodo = ?", [id_periodo]);
    if (!exists.length) return res.status(404).json({ message: "El periodo no existe" });
    // Actualiza los datos del periodo
    const [result] = await db.query(
      "UPDATE periodo SET periodo = ?, fecha_inicio = ?, fecha_fin = ?, estado = ? WHERE id_periodo = ?",
      [periodo, fecha_inicio, fecha_fin, estado, id_periodo]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el periodo" });
    }
    // Responde con el mensaje de éxito y los nuevos valores
    res.status(200).json({
      message: `'${periodo}' actualizado correctamente`,
      id_periodo,
      periodo,
      fecha_inicio,
      fecha_fin,
      estado,
    });
  } catch (error) {
    console.error("Error al actualizar periodo:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Eliminar un periodo
export const deletePeriodo = async(req, res) => {
  try {
    const {id_periodo } = req.params;
    const [periodo] = await db.query("SELECT periodo FROM periodo WHERE id_periodo = ?", [id_periodo]);
    if (!periodo.length) return res.status(404).json({ message: "periodo no encontrado" });
    const [rows] = await db.query("DELETE FROM periodo WHERE id_periodo = ?", [id_periodo]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${periodo[0].periodo}' eliminado correctamente` })
      : res.status(404).json({ message: "periodo no encontrado" });  
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
