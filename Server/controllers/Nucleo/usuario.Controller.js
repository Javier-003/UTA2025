import { db } from "../../db/connection.js";

export const getUsuarioTodos = async (req, res) => {
  try {
    const query = `
      SELECT 
        r.id_rol,
        r.nombre AS nombre_rol,
        ru.id_usuario,
        u.usuario AS nombre_usuario
      FROM 
        Rol r
      LEFT JOIN 
        Rol_Usuario ru ON r.id_rol = ru.id_rol
      LEFT JOIN 
        Usuario u ON ru.id_usuario = u.id_user
      GROUP BY 
        r.id_rol, r.nombre, ru.id_usuario, u.usuario;
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
    const { id_persona, usuario, contrasena, estatus } = req.body;

    if (!id_persona || !usuario || !contrasena || estatus === undefined) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_persona, usuario, contrasena, estatus" });
    }

    const [exists] = await db.query("SELECT 1 FROM Usuario WHERE usuario = ?", [usuario]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del usuario ya existe" });
    }

    const [rows] = await db.query(
      "INSERT INTO Usuario (id_persona, usuario, contrasena, estatus) VALUES (?, ?, ?, ?)",
      [id_persona, usuario, contrasena, estatus]
    );

    res.status(201).json({
      message: `'${usuario}' creado`,
      idUsuario: rows.insertId,
      idPersona: id_persona,
      usuario,
      estatus,
    });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id_user } = req.params;
    const { id_persona, usuario, contrasena, estatus } = req.body;

    const [exists] = await db.query("SELECT 1 FROM Usuario WHERE id_user = ?", [id_user]);
    if (!exists.length) {
      return res.status(404).json({ message: "El usuario no existe" });
    }

    const [result] = await db.query(
      "UPDATE Usuario SET id_persona = ?, usuario = ?, contrasena = ?, estatus = ? WHERE id_user = ?",
      [id_persona, usuario, contrasena, estatus, id_user]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el usuario" });
    }

    res.status(200).json({
      message: `'${usuario}' actualizado correctamente`,
      idUsuario: id_user,
      idPersona: id_persona,
      usuario,
      estatus,
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteUsuario = async(req, res) => {
  try {
    const { id_user } = req.params;

    const [usuario] = await db.query("SELECT usuario FROM Usuario WHERE id_user = ?", [id_user]);
    if (!usuario.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const [rows] = await db.query("DELETE FROM Usuario WHERE id_user = ?", [id_user]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${usuario[0].usuario}' eliminado correctamente` })
      : res.status(404).json({ message: "Usuario no encontrado" });  
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
