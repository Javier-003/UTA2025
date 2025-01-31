import { db } from "../../db/connection.js";

export const getAulatodos = async (req, res) => {
  try {
    const query = `SELECT a.*, e.Nombre AS NombreEdificio 
    FROM aula a
    JOIN edificio e ON a.idEdificio = e.idEdificio`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Aulas obtenidas correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron aulas" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createAula = async (req, res) => {
  try {
    const { idEdificio, tipo, nombre, sigla } = req.body;
    if (!idEdificio || !tipo || !nombre || !sigla) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idEdificio, tipo, nombre, sigla" });
    }
    const [exists] = await db.query("SELECT 1 FROM aula WHERE nombre = ?", [nombre]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del aula ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO aula (idEdificio, tipo, nombre, sigla) VALUES (?, ?, ?, ?)",
      [idEdificio, tipo, nombre, sigla]
    );
    // Obtener el nombre del edificio recién creado
    const [edificio] = await db.query("SELECT Nombre FROM edificio WHERE idEdificio = ?", [idEdificio]);
    res.status(201).json({
      message: `'${nombre}' creado`,
      idAula: rows.insertId,
      idEdificio, NombreEdificio: edificio[0].Nombre, tipo, nombre, sigla
    });
  } catch (error) {
    console.error("Error al crear aula:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateAula = async (req, res) => {
  try {
    const { idAula } = req.params;
    const { idEdificio, tipo, nombre, sigla } = req.body;
    const [exists] = await db.query("SELECT 1 FROM aula WHERE idAula = ?", [idAula]);
    if (!exists.length) {
      return res.status(404).json({ message: "El Aula no existe" });
    }
    const [result] = await db.query(
      "UPDATE aula SET tipo = ?, nombre = ?, sigla = ?, idEdificio = ? WHERE idAula = ?",
      [tipo, nombre, sigla, idEdificio, idAula]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el aula" });
    }
    const [edificio] = await db.query("SELECT Nombre FROM edificio WHERE idEdificio = ?", [idEdificio]);
    res.status(200).json({
      message: `'${nombre}' actualizado correctamente`,
      idAula, idEdificio, NombreEdificio: edificio[0].Nombre, tipo, nombre, sigla
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteAula = async (req, res) => {
  try {
    const { idAula } = req.params;
    const [aula] = await db.query("SELECT nombre FROM aula WHERE idAula = ?", [idAula]);
    if (!aula.length) return res.status(404).json({ message: "Aula no encontrada" });
    const [rows] = await db.query("DELETE FROM aula WHERE idAula = ?", [idAula]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${aula[0].nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Aula no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
