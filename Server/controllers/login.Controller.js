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

export const logoutLogin = async (req,res) => {
  res.status(200).json({ message: "Cerrando Sesion" });
}
