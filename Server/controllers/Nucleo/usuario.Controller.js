import { db } from "../../db/connection.js";
import bcrypt from 'bcryptjs';

export const getUsuarioTodos = async (req, res) => {
  try {
    const query = `SELECT 
    u.idUsuario, u.usuario, u.contrasena, u.estatus,
    p.idPersona, p.nombre, p.paterno, p.materno,
    GROUP_CONCAT(r.idRol SEPARATOR ', ') AS rolId,
    GROUP_CONCAT(r.nombre SEPARATOR ', ') AS roles
    FROM 
    usuario u
    LEFT JOIN 
    persona p ON u.idPersona = p.idPersona
    LEFT JOIN 
    rolusuario ru ON u.idUsuario = ru.IdUsuario
    LEFT JOIN 
    rol r ON ru.idRol = r.idRol
    GROUP BY 
    u.idUsuario, p.idPersona;`;
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
    const { idPersona, usuario, contrasena, estatus, idRol } = req.body;
    if (!idPersona || !usuario || !contrasena || estatus === undefined || !idRol) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idPersona, usuario, contrasena, estatus, idRol" });
    }
    // Encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);
    // Consulta SQL para verificar si el usuario ya existe
    const checkUserQuery = `SELECT COUNT(*) AS count FROM Usuario WHERE usuario = ?`;
    // Consulta SQL para insertar un nuevo usuario
    const insertUserQuery = `INSERT INTO Usuario (idPersona, usuario, contrasena, estatus) VALUES (?, ?, ?, ?)`;
    // Consulta SQL para insertar la relación en la tabla RolUsuario
    const insertRolUsuarioQuery = `INSERT INTO RolUsuario (idUsuario, idRol) VALUES (?, ?)`;   
    try {
      // Verificar si el usuario ya existe
      const [checkResult] = await db.query(checkUserQuery, [usuario]);
      if (checkResult[0].count > 0) {
        return res.status(400).json({ message: "El nombre del usuario ya existe" });
      }
      // Ejecutar la consulta para insertar el nuevo usuario
      const [userResult] = await db.query(insertUserQuery, [idPersona, usuario, hashedPassword, estatus]);
      // Obtener el ID del nuevo usuario insertado
      const newUserId = userResult.insertId;
      // Ejecutar la consulta para insertar la relación en la tabla RolUsuario
      await db.query(insertRolUsuarioQuery, [newUserId, idRol]);
      res.status(201).json({message: `'${usuario}' creado con rol`,
        idUsuario: newUserId,idPersona: idPersona,usuario,estatus,idRol});
    } catch (error) {
      console.error("Error al crear usuario:", error);
      res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    const { idPersona, usuario, contrasena, estatus } = req.body;
    // Verificar si el nombre de usuario ya existe en otro usuario
    const checkQuery = `SELECT COUNT(*) as count FROM Usuario WHERE usuario = ? AND idUsuario != ?`;
    // Consulta SQL para actualizar los datos del usuario
    let updateUserQuery = `UPDATE Usuario SET usuario = ?, estatus = ?`; 
    const queryParams = [usuario, estatus];
    // Verificar si se proporciona idPersona
    if (idPersona) { updateUserQuery += ', idPersona = ?';
      queryParams.push(idPersona);
    }
    // Verificar si se proporciona contrasena y encriptarla
    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(contrasena, salt);
      updateUserQuery += ', contrasena = ?';
      queryParams.push(hashedPassword);
    }
    updateUserQuery += ' WHERE idUsuario = ?';  queryParams.push(idUsuario);
    try {
      // Ejecutar la consulta de verificación
      const [checkResult] = await db.query(checkQuery, [usuario, idUsuario]);
      if (checkResult[0].count > 0) {
        // Si el nombre de usuario ya existe en otro usuario, rechazar la promesa
        return res.status(400).json({ message: "El nombre de usuario ya está registrado en otro usuario." });
      }
      // Ejecutar la consulta para actualizar el usuario
      const [result] = await db.query(updateUserQuery, queryParams);
      if (result.affectedRows === 0) {
        return res.status(400).json({ message: "No se pudo actualizar el usuario" });
      }
      res.status(200).json({message: `'${usuario}' actualizado correctamente`,
        idUsuario: idUsuario,idPersona: idPersona,usuario,estatus,});
    } catch (error) {
      console.error("Error al actualizar usuario:", error);
      res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    const { idUsuario } = req.params;
    // Verificar si el usuario existe
    const [usuario] = await db.query("SELECT usuario FROM Usuario WHERE idUsuario = ?", [idUsuario]);
    if (!usuario.length) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    // Eliminar el usuario de la tabla Rol_Usuario
    const deleteRolUsuarioQuery = `DELETE FROM rolUsuario WHERE idUsuario = ?`;
    await db.query(deleteRolUsuarioQuery, [idUsuario]);
    // Eliminar el usuario de la tabla Usuario
    const deleteUserQuery = `DELETE FROM Usuario WHERE idUsuario = ?`;
    const [rows] = await db.query(deleteUserQuery, [idUsuario]);
    if (rows.affectedRows) {
      res.status(200).json({ message: `'${usuario[0].usuario}' eliminado correctamente` });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
