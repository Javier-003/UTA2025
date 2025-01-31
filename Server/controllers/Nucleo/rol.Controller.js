import { db } from "../../db/connection.js";

export const createRol = async (req, res) => {
  try {
    const { nombre } = req.body;
    if (!nombre) {
      return res.status(400).json({ message: "El campo 'nombre' es requerido" });
    }
    const [exists] = await db.query("SELECT 1 FROM rol WHERE nombre = ?", [nombre]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del rol ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO rol (nombre) VALUES (?)",
      [nombre]
    );
    res.status(201).json({ message: "Rol agregado correctamente", data: { idRol: rows.insertId, nombre } });
  } catch (error) {
    console.error("Error al agregar rol:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { idRol } = req.params;
    const [exists] = await db.query("SELECT 1 FROM rol WHERE idRol = ?", [idRol]);
    if (!exists.length) {
      return res.status(404).json({ message: "El rol no existe" });
    }
    const [rows] = await db.query("DELETE FROM rol WHERE idRol = ?", [idRol]);
    if (rows.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo eliminar el rol" });
    }
    res.status(200).json({ message: `Rol eliminado correctamente con id ${idRol}` });
  } catch (error) {
    console.error("Error al eliminar rol:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
