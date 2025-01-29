import { db } from "../../db/connection.js";

export const getActividadtodos = async(req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM actividad");
    if (rows.length > 0) {
      res.json({ message: "Actividad obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron actividad" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createActividad = async (req, res) => {
  try {
    const { nombre } = req.body;
    const [exists] = await db.query("SELECT 1 FROM actividad WHERE nombre = ?", [nombre]);
    if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
    const [rows] = await db.query("INSERT INTO actividad (nombre) VALUES (?)", [nombre]);
    res.status(201).json({ message: `'${nombre}' creado`, idActividad: rows.insertId });
  } catch {
    res.status(500).json({ message: "Algo salió mal" });
  }
};

export const updateActividad = async (req, res) => {
  try {
    const { idActividad } = req.params;
    const { nombre } = req.body;
    if (nombre) {
      const [exists] = await db.query("SELECT 1 FROM actividad WHERE nombre = ? AND idActividad != ?", [nombre, idActividad]);
      if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
    }
    const [result] = await db.query("UPDATE actividad SET nombre = IFNULL(?, nombre) WHERE idActividad = ?", [nombre, idActividad]);
    if (!result.affectedRows) return res.status(404).json({ message: "Actividad no encontrada" });
    const [[updated]] = await db.query("SELECT * FROM actividad WHERE idActividad = ?", [idActividad]);
    res.json({ message: `'${updated.nombre}' actualizado`, actividad: updated });
  } catch {
    res.status(500).json({ message: "Algo salió mal" });
  }
};

export const deleteActividad = async(req, res) => {
  try {
    const {idActividad } = req.params;
    const [actividad] = await db.query("SELECT nombre FROM actividad WHERE idActividad = ?", [idActividad]);
    if (!actividad.length) return res.status(404).json({ message: "Actividad no encontrado" });
    const [rows] = await db.query("DELETE FROM actividad WHERE idActividad = ?", [idActividad]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${actividad[0].nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Actividad no encontrado" });  
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
