import { db } from "../../db/connection.js";

export const createRol = async (req, res) => {
  try {
    const { id_usuario, id_rol } = req.body;
    if (!id_usuario || !id_rol) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_usuario, id_rol" });
    }
    const [exists] = await db.query("SELECT 1 FROM rol_usuario WHERE id_usuario = ? AND id_rol = ?", [id_usuario, id_rol]);
    if (exists.length) {
      return res.status(400).json({ message: "El rol del usuario ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO rol_usuario (id_usuario, id_rol) VALUES (?, ?)",
      [id_usuario, id_rol]
    );
    res.status(201).json({ message: "Rol agregado correctamente", data: { id_usuario, id_rol } });
  } catch (error) {
    console.error("Error al agregar rol:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { id_usuario, id_rol } = req.body;
    const [exists] = await db.query("SELECT 1 FROM rol_usuario WHERE id_usuario = ? AND id_rol = ?", [id_usuario, id_rol]);
    if (!exists.length) {
      return res.status(404).json({ message: "El rol del usuario no existe" });
    }
    const [rows] = await db.query("DELETE FROM rol_usuario WHERE id_usuario = ? AND id_rol = ?", [id_usuario, id_rol]);
    if (rows.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo eliminar el rol" });
    }
    res.status(200).json({ message: `Rol eliminado correctamente para el usuario ${id_usuario} y rol ${id_rol}` });
  } catch (error) {
    console.error("Error al eliminar rol:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
