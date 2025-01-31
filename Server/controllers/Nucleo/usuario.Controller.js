import { db } from "../../db/connection.js";

export const getUsuarioTodos = async (req, res) => {
  try {
    const query = `
      SELECT 
        r.idRol,
        r.nombre AS nombreRol,
        ru.idUsuario,
        u.usuario AS nombreUsuario
      FROM 
        Rol r
      LEFT JOIN 
        RolUsuario ru ON r.idRol = ru.idRol
      LEFT JOIN 
        Usuario u ON ru.idUsuario = u.idUsuario
      GROUP BY 
        r.idRol, r.nombre, ru.idUsuario, u.usuario;
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Usuarios obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron usuarios" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { idPersona, usuario, contrasena, estatus } = req.body;
    if (!idPersona || !usuario || !contrasena || estatus === undefined) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idPersona, usuario, contrasena, estatus" });
    }
    const [exists] = await db.query("SELECT 1 FROM Usuario WHERE usuario = ?", [usuario]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del usuario ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO Usuario (idPersona, usuario, contrasena, estatus) VALUES (?, ?, ?, ?)",
      [idPersona, usuario, contrasena, estatus]
    );
    res.status(201).json({
      message: `'${usuario}' creado`,
      idUsuario: rows.insertId,
      idPersona: idPersona,
      usuario,estatus,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { idPersona, usuario, contrasena, estatus } = req.body;
    const [exists] = await db.query("SELECT 1 FROM Usuario WHERE idUsuario = ?", [idUsuario]);
    if (!exists.length) {
      return res.status(404).json({ message: "El usuario no existe" });
    }
    const [result] = await db.query(
      "UPDATE Usuario SET idPersona = ?, usuario = ?, contrasena = ?, estatus = ? WHERE idUsuario = ?",
      [idPersona, usuario, contrasena, estatus, idUsuario]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el usuario" });
    }
    res.status(200).json({
      message: `'${usuario}' actualizado correctamente`,
      idUsuario: idUsuario,
      idPersona: idPersona,
      usuario,estatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const [usuario] = await db.query("SELECT usuario FROM Usuario WHERE idUsuario = ?", [idUsuario]);
    if (!usuario.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    const [rows] = await db.query("DELETE FROM Usuario WHERE idUsuario = ?", [idUsuario]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${usuario[0].usuario}' eliminado correctamente` })
      : res.status(404).json({ message: "Usuario no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
