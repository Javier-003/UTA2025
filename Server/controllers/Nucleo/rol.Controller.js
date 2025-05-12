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

export const getAllRols = async (req, res) => {
  try {
    // Verificar si el nombre de usuario ya existe en otro usuario
    const checkQuery = `SELECT * FROM rol;`;

    const [rows] = await db.query(checkQuery);
    res.status(200).json({
      message: rows.length > 0 ? "Roles obtenidos correctamente" : "Error al obtener los roles",
      data: rows
    });
  } catch (error) {
    console.error("Error al consultar roles de usuario:", error);
    res.status(500).json({ message: "Algo salió mal al consultar los roles.", error: error.message });
  }
}

export const getRol = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    // Verificar si el nombre de usuario ya existe en otro usuario
    const checkQuery = `SELECT r.idRol, r.nombre FROM rol r WHERE NOT EXISTS ( SELECT 1 FROM rolusuario ru WHERE ru.idRol = r.idRol AND ru.IdUsuario = ?);`;

    const [rows] = await db.query(checkQuery, [idUsuario]);
    res.status(200).json({
      message: rows.length > 0 ? "Roles obtenidos correctamente" : "El usuario ya cuenta con todos los roles asignados",
      data: rows
    });
  } catch (error) {
    console.error("Error al consultar roles de usuario:", error);
    res.status(500).json({ message: "Algo salió mal al consultar los roles.", error: error.message });
  }
}

export const getDelRol = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    // Verificar si el nombre de usuario ya existe en otro usuario
    const checkQuery = `SELECT r.idRol, r.nombre FROM rol r WHERE ( SELECT 1 FROM rolusuario ru WHERE ru.idRol = r.idRol AND ru.IdUsuario = ?);`;

    const [rows] = await db.query(checkQuery, [idUsuario]);
    res.status(200).json({
      message: rows.length > 0 ? "Roles obtenidos correctamente" : "El usuario ya cuenta con todos los roles asignados",
      data: rows
    });
  } catch (error) {
    console.error("Error al consultar roles de usuario:", error);
    res.status(500).json({ message: "Algo salió mal al consultar los roles.", error: error.message });
  }
}

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
