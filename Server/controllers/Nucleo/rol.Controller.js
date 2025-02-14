import { db } from "../../db/connection.js";

export const getRolestodos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM rol");
    if (rows.length > 0) {    
      res.json({ message: "Roles obtenidas correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron rol" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createRol = async (req, res) => {
  try {
    const { idUsuario, idRol } = req.body;
    const query = 'INSERT INTO rolUsuario (idUsuario, idRol) VALUES (?, ?)';
    const [result] = await db.execute(query, [idUsuario, idRol]);
    res.status(201).json({ message: "Rol agregado al usuario correctamente", data: result });
  } catch (error) {
    console.error("Error al agregar rol al usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteRol = async (req, res) => {
  try {
    const { idUsuario, idRol } = req.body;
    const query = 'DELETE FROM rolUsuario WHERE idUsuario = ? AND idRol = ?';
    const [result] = await db.execute(query, [idUsuario, idRol]);
    res.status(200).json({ message: "Rol eliminado del usuario correctamente", data: result });
  } catch (error) {
    console.error("Error al eliminar rol del usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
