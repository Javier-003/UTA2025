import { db } from "../../db/connection.js";

export const getPuestotodos = async (req, res) => {
  try {
    const query = `
      SELECT p.idPuesto, p.idDepartamento, p.nombre, d.nombre AS nombre_departamento
      FROM puesto p
      JOIN departamento d ON p.idDepartamento = d.idDepartamento
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Puestos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron puestos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createPuesto = async (req, res) => {
  try {
    const { idDepartamento, nombre } = req.body;
    if (!idDepartamento || !nombre) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idDepartamento, nombre" });
    }
    const [exists] = await db.query("SELECT 1 FROM puesto WHERE nombre = ?", [nombre]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del puesto ya existe" });
    }
    const [rows] = await db.query(
      "INSERT INTO puesto (idDepartamento, nombre) VALUES (?, ?)",
      [idDepartamento, nombre]
    );
    const [departamento] = await db.query("SELECT nombre FROM departamento WHERE idDepartamento = ?", [idDepartamento]);
    res.status(201).json({
      message: `'${nombre}' creado`,
      idPuesto: rows.insertId,
      idDepartamento: idDepartamento,
      nombreDepartamento: departamento[0].nombre,
      nombre
    });
  } catch (error) {
    console.error("Error al crear puesto:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updatePuesto = async (req, res) => {
  try {
    const { idPuesto } = req.params;
    const { idDepartamento, nombre } = req.body;
    const [exists] = await db.query("SELECT 1 FROM puesto WHERE idPuesto = ?", [idPuesto]);
    if (!exists.length) {
      return res.status(404).json({ message: "El puesto no existe" });
    }
    const [result] = await db.query(
      "UPDATE puesto SET idDepartamento = ?, nombre = ? WHERE idPuesto = ?",
      [idDepartamento, nombre, idPuesto]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el puesto" });
    }
    const [departamento] = await db.query("SELECT nombre FROM departamento WHERE idDepartamento = ?", [idDepartamento]);
    res.status(200).json({
      message: `'${nombre}' actualizado correctamente`,
      idPuesto: idPuesto,
      idDepartamento: idDepartamento,
      nombreDepartamento: departamento[0].nombre,
      nombre
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deletePuesto = async (req, res) => {
  try {
    const { idPuesto } = req.params;
    const [puesto] = await db.query("SELECT nombre FROM puesto WHERE idPuesto = ?", [idPuesto]);
    if (!puesto.length) return res.status(404).json({ message: "Puesto no encontrado" });
    const [rows] = await db.query("DELETE FROM puesto WHERE idPuesto = ?", [idPuesto]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${puesto[0].nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Puesto no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
