import { db } from "../../db/connection.js";

export const getEdificiotodos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM edificio");
    if (rows.length > 0) {
      res.json({ message: "Edificios obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron edificios" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createEdificio = async (req, res) => {
  try {
    const { nombre, sigla } = req.body;
    const [exists] = await db.query("SELECT 1 FROM edificio WHERE nombre = ?", [nombre]);
    if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
    const [rows] = await db.query("INSERT INTO edificio (nombre, sigla) VALUES (?, ?)", [nombre, sigla]);
    res.status(201).json({
      message: `'${nombre}' creado`,
      idEdificio: rows.insertId,
      nombre: nombre,
      sigla: sigla
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateEdificio = async (req, res) => {
  try {
    const { idEdificio } = req.params;
    const { nombre, sigla } = req.body; 
    const [exists] = await db.query("SELECT 1 FROM edificio WHERE idEdificio = ?", [idEdificio]);
    if (!exists.length) return res.status(404).json({ message: "El edificio no existe" });
    const [result] = await db.query("UPDATE edificio SET nombre = ?, sigla = ? WHERE idEdificio = ?", [nombre, sigla, idEdificio]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el edificio" });
    }
    res.status(200).json({
      message: `'${nombre}' actualizado correctamente`,
      idEdificio: idEdificio,
      nombre: nombre,
      sigla: sigla
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteEdificio = async (req, res) => {
  try {
    const { idEdificio } = req.params;
    const [edificio] = await db.query("SELECT nombre FROM edificio WHERE idEdificio = ?", [idEdificio]);
    if (!edificio.length) return res.status(404).json({ message: "Edificio no encontrado" });
    const [rows] = await db.query("DELETE FROM edificio WHERE idEdificio = ?", [idEdificio]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${edificio[0].nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Edificio no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
