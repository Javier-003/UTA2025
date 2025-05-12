import jwt from 'jsonwebtoken';
import {SECRET_JWT_KEY} from "../conf.js"

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.acces_token;

  if (!token) {
    return res.status(401).json({ message: 'No autorizado. Token faltante.' });
  }

  try {
    const decoded = jwt.verify(token, SECRET_JWT_KEY);
    req.user = decoded; // Guardamos los datos decodificados para usarlos después
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
}