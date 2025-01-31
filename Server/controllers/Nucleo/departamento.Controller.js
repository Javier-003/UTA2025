import { db } from "../../db/connection.js";

export const getDepartamentotodos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM departamento");
    if (rows.length > 0) {
      res.json({ message: "Departamentos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron departamentos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createDepartamento = async (req, res) => {
  try {
    const { nombre, sigla } = req.body;
    const [exists] = await db.query("SELECT 1 FROM departamento WHERE nombre = ?", [nombre]);
    if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
    // Inserta los datos del nuevo departamento
    const [rows] = await db.query("INSERT INTO departamento (nombre, sigla) VALUES (?, ?)", [nombre, sigla]);
    res.status(201).json({
      message: `'${nombre}' creado`,
      idDepartamento: rows.insertId,
      nombre: nombre,
      sigla: sigla
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateDepartamento = async (req, res) => {
  try {
    const { idDepartamento } = req.params; 
    const { nombre, sigla } = req.body; 
    const [exists] = await db.query("SELECT 1 FROM departamento WHERE idDepartamento = ?", [idDepartamento]);
    if (!exists.length) return res.status(404).json({ message: "El departamento no existe" });
    // Actualiza los datos del departamento
    const [result] = await db.query("UPDATE departamento SET nombre = ?, sigla = ? WHERE idDepartamento = ?", [nombre, sigla, idDepartamento]);
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el departamento" });
    }
    res.status(200).json({
      message: `'${nombre}' actualizado correctamente`,
      idDepartamento: idDepartamento,
      nombre: nombre,
      sigla: sigla
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteDepartamento = async (req, res) => {
  try {
    const { idDepartamento } = req.params;
    const [departamento] = await db.query("SELECT nombre FROM departamento WHERE idDepartamento = ?", [idDepartamento]);
    if (!departamento.length) return res.status(404).json({ message: "Departamento no encontrado" });
    const [rows] = await db.query("DELETE FROM departamento WHERE idDepartamento = ?", [idDepartamento]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${departamento[0].nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Departamento no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
