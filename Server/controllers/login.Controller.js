import { db } from "../db/connection.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import cookieParser from "cookie-parser";
import { SECRET_JWT_KEY } from "../conf.js"

export const accessLogin = async (req, res) => {
  try {

    const { Username, Password } = req.body;

    if (
      !Username ||
      Username === "" ||
      !Password ||
      Password === ""
    ) {
      return res.status(400).json({ message: "Introduce tu nombre de usuario y contraseña" });
    }

    const query = 'SELECT u.idUsuario, u.usuario as Username, u.contrasena as Contrasena, u.estatus, r.idRol, r.nombre AS nombreRol FROM usuario u JOIN rolusuario ru ON u.idUsuario = ru.IdUsuario JOIN rol r ON ru.idRol = r.idRol WHERE u.usuario = ?;'

    const [data] = await db.query(query, [Username]);
    if (data.length === 0) {  // Cambiado < 0 a === 0
      return res.status(409).json({ message: "Usuario no encontrado" });
    } else {
      const foundUser = data[0];
      const matchPassword = bcrypt.compareSync(Password, foundUser.Contrasena);
      const username = foundUser.Username
      const rol = foundUser.nombreRol

      if (!matchPassword || foundUser.estatus !== 1) {
        return res.status(409).send({ message: `Usuario o contraseña incorrectos` });
      } else {
        const token = jwt.sign({ username: username, rol: rol }, SECRET_JWT_KEY, { expiresIn: '8h' });
	console.log("Enviando cookie")
	res.cookie('acces_token', token, {
          httpOnly: true,
          secure: true,
          sameSite: 'none',
          maxAge: 1000 * 60 * 60 * 24
        });
          return res.status(200).send({
            message: `Autenticación exitosa`
          });
      }
    }

  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
    return
  }
}

export const getSession = (req, res) => {
  const token = req.cookies['acces_token']; // asegúrate que sea el mismo nombre que usaste

  if (!token) {
    return res.status(401).json({ message: 'No autenticado' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY);
    const { username, rol } = decoded;

    res.status(200).json({ username, rol });
  } catch (error) {
    res.status(403).json({ message: 'Token inválido', error: error.message });
  }
};

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

export const logoutLogin = async (req, res) => {
  res.clearCookie('acces_token', {
    httpOnly: true,
    secure: true,  // asegúrate que esté en true si usas HTTPS
    sameSite: 'none',
  }).status(200).json({ message: "Cerrando Sesion" });
}
