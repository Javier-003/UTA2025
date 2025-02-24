import { db } from "../../db/connection.js";
//Act. 
export const getPersonatodos = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM persona");
    if (rows.length > 0) {    
      res.json({ message: "Personas obtenidas correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron personas" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createPersona = async (req, res) => {
  try {
    const { nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono } = req.body;
    const [exists] = await db.query("SELECT 1 FROM persona WHERE curp = ?", [curp]);
    if (exists.length) return res.status(400).json({ message: "El CURP ya existe" });
    const [result] = await db.query(
      "INSERT INTO persona (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
      [nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono]
    );
    res.status(201).json({
      message: `'${nombre} ${paterno}' creado`,
      idPersona: result.insertId,
      nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono
    });
  } catch (error) {
    console.error("Error al crear la persona:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deletePersona = async (req, res) => {
  try {
    const { idPersona } = req.params;
    const [persona] = await db.query("SELECT nombre FROM persona WHERE idPersona = ?", [idPersona]);
    if (!persona.length) return res.status(404).json({ message: "Persona no encontrada" });
    
    const [result] = await db.query("DELETE FROM persona WHERE idPersona = ?", [idPersona]);
    result.affectedRows
      ? res.status(200).json({ message: `'${persona[0].nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Persona no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updatePersona = async (req, res) => {
  try {
    const { idPersona } = req.params;
    const { nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono } = req.body;
    const [exists] = await db.query("SELECT 1 FROM persona WHERE idPersona = ?", [idPersona]);
    if (!exists.length) return res.status(404).json({ message: "Persona no encontrada" });
    const [curpExists] = await db.query("SELECT 1 FROM persona WHERE curp = ? AND idPersona != ?", [curp, idPersona]);
    if (curpExists.length) return res.status(400).json({ message: "El CURP ya existe para otra persona" });
    const [result] = await db.query(
      "UPDATE persona SET nombre = ?, paterno = ?, materno = ?, nacimiento = ?, curp = ?, genero = ?, direccion = ?, telefono = ? WHERE idPersona = ?",
      [nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idPersona]
    );
    if (result.affectedRows === 0) return res.status(400).json({ message: "No se pudo actualizar la persona" });
    res.status(200).json({
      message: `'${nombre} ${paterno}' actualizado correctamente`,
      idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono
    });
  } catch (error) {
    console.error("Error al actualizar la persona:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
