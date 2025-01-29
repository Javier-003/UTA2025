import { db } from "../../db/connection.js";

export const getBitacoratodos = async(req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bitacora");
    if (rows.length > 0) {
      res.json({ message: "Bitacora obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron bitacora" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createBitacora = async (req, res) => {
    try {
      const { nombre_usuario, movimiento, accion, fecha, ip } = req.body;
      const [exists] = await db.query("SELECT 1 FROM bitacora WHERE nombre_usuario = ?",
         [nombre_usuario, movimiento, accion,fecha,  ip ]);
      if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
      const [rows] = 
      await db.query("INSERT INTO bitacora (nombre_usuario,  movimiento, accion,fecha, ip ) VALUES (?,?,?,?,?)",
         [nombre_usuario, movimiento, accion, ip ]);
      res.status(201).json({ message: `'${nombre_usuario}' creado`, id_bitacora: rows.insertId });
    } catch {
      res.status(500).json({ message: "Algo salió mal" });
    }
};
