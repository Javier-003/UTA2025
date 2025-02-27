import { db } from "../db/connection.js";
import  jwt  from "jsonwebtoken";
import  bcrypt from "bcryptjs";

export const accessLogin = async (req,res) => {
  try {

    const {Username, Password} = req.body;

    if (
      !Username ||
      Username === "" ||
      !Password ||
      Password === ""
    ) {
      return res.status(400).json({ message: "Introduce tu nombre de usuario y contraseña" });
    }

    const query = 'SELECT * FROM usuario WHERE usuario = ?;'
    const [data] = await db.query(query, [Username]);
    if (data.length === 0) {  // Cambiado < 0 a === 0
      return res.status(409).json({ message: "Usuario no encontrado" });
    } else {
        const foundUser = data[0];
        const matchPassword = await bcrypt.compare(Password, foundUser.contrasena);
    
        if (!matchPassword ) {
          return res.status(409).send({ message: `Usuario o contraseña incorrectos` });
        } else {
          const token = jwt.sign({Username}, "Stack", {expiresIn: '24h'});
          return res.status(200).send({
            message: `Autenticación exitosa`,
            Username: Username,
            Token: token
          });
        }
    }
    

  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
    return
  }
}

export const forgotLogin = async (req, res) => {
  try {
    const { Username } = req.body;

    if (!Username) {
      return res.status(400).json({ message: "Introduce tu nombre de usuario" });
    }

    const query = 'SELECT * FROM usuario WHERE usuario = ?;';
    const [data] = await db.query(query, [Username]);

    if (data.length === 0) {
      return res.status(409).json({ message: "Usuario no encontrado" });
    }

    return res.status(200).json({
      message: "Usuario encontrado",
      Username,
    });

  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { Username } = req.params;
    const { newPassword, repeatPassword } = req.body;

    // Verificaciones de parámetros
    if (!Username || !newPassword || !repeatPassword) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    if (newPassword !== repeatPassword) {
      return res.status(400).json({ message: "Las contraseñas no coinciden" });
    }

    const query = 'SELECT * FROM usuario WHERE usuario = ?;';
    const [data] = await db.query(query, [Username]);

    if (data.length === 0) {
      return res.status(409).json({ message: "Usuario no encontrado" });
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      "UPDATE usuario SET contrasena = ? WHERE usuario = ?",
      [passwordHash, Username]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar la contraseña" });
    }

    return res.status(200).json({
      message: "Contraseña actualizada correctamente",
    });

  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const logoutLogin = async (req,res) => {
  res.status(200).json({ message: "Cerrando Sesion" });
}
