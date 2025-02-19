import { db } from '../db/connection.js'; // Ajusta la ruta según tu estructura

const bitacora = (accion, movimiento) => {
    return async (req, res, next) => {
      const ipAddress = req.ip;
      const username = req.body.userSession || 'Anónimo';
      try {
        await db.execute(
          'INSERT INTO bitacora (nombreUsuario, movimiento, accion, ip, fecha) VALUES (?, ?, ?, ?, NOW())',
          [username, movimiento, accion, ipAddress]
        );
      } catch (error) {
        console.error('Error al registrar la acción en la bitácora:', error);
      }
      next();
    };
};

export default bitacora;
