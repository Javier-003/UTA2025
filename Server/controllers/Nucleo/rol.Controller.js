import { db } from "../../db/connection.js";

// Crear rol para el usuario
export const createRol = async (req, res) => {
  try {
    const { idUsuario, idRol, userSession } = req.body;

    // Validar que los datos necesarios estén presentes
    if (!idUsuario || !idRol) {
      return res.status(400).json({ message: "Faltan datos: idUsuario o idRol." });
    }

    const query = 'INSERT INTO rolUsuario (idUsuario, idRol) VALUES (?, ?)';
    const [result] = await db.execute(query, [idUsuario, idRol]);

    // Verificar si se insertó correctamente el rol
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Rol agregado al usuario correctamente", userSession: userSession, data: result });
    } else {
      res.status(400).json({ message: "No se pudo agregar el rol al usuario." });
    }
  } catch (error) {
    console.error("Error al agregar rol al usuario:", error);
    res.status(500).json({ message: "Algo salió mal al agregar el rol.", error: error.message });
  }
};

// Eliminar rol del usuario
export const deleteRol = async (req, res) => {
  try {
    const { idUsuario, idRol, userSession } = req.body;

    // Validar que los datos necesarios estén presentes
    if (!idUsuario || !idRol) {
      return res.status(400).json({ message: "Faltan datos: idUsuario o idRol." });
    }

    const query = 'DELETE FROM rolUsuario WHERE idUsuario = ? AND idRol = ?';
    const [result] = await db.execute(query, [idUsuario, idRol]);

    // Verificar si se eliminó correctamente el rol
    if (result.affectedRows > 0) {
      res.status(200).json({ message: "Rol eliminado del usuario correctamente", userSession: userSession, data: result });
    } else {
      res.status(400).json({ message: "No se pudo eliminar el rol del usuario." });
    }
  } catch (error) {
    console.error("Error al eliminar rol del usuario:", error);
    res.status(500).json({ message: "Algo salió mal al eliminar el rol.", error: error.message });
  }
};
