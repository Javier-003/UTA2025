import { db } from "../../db/connection.js";

export const getPersonatodos = async(req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM persona");
    if (rows.length > 0) {    
      res.json({ message: "Persona obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron personas" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createPersona = async (req, res) => {
    try {
      const { nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento } = req.body;
      const [exists] = await db.query("SELECT 1 FROM persona WHERE curp = ?", [curp]);
      if (exists.length) return res.status(400).json({ message: "El CURP ya existe" });
      const [result] = await db.query(
        "INSERT INTO persona (nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
        [nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento]
      );
      res.status(201).json({
        message: `'${nombre} ${apellido_paterno}' creado`,
        id_persona: result.insertId,nombre,apellido_paterno,apellido_materno,genero,direccion,telefono,curp,fecha_nacimiento
      });
    } catch (error) {
      console.error("Error al crear la persona:", error);
      res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};

export const deletePersona = async (req, res) => {
    try {
      const { id_persona } = req.params;
      const [persona] = await db.query("SELECT nombre FROM persona WHERE id_persona = ?", [id_persona]);
      if (!persona.length) return res.status(404).json({ message: "Persona no encontrada" });
      
      const [result] = await db.query("DELETE FROM persona WHERE id_persona = ?", [id_persona]);
      result.affectedRows
        ? res.status(200).json({ message: `'${persona[0].nombre}' eliminado correctamente` })
        : res.status(404).json({ message: "Persona no encontrada" });
    } catch (error) {
      res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
  };
  
export const updatePersona = async (req, res) => {
    try {
      const { id_persona } = req.params;
      const { nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento } = req.body;
      const [exists] = await db.query("SELECT 1 FROM persona WHERE id_persona = ?", [id_persona]);
      if (!exists.length) return res.status(404).json({ message: "Persona no encontrada" });
      const [curpExists] = await db.query("SELECT 1 FROM persona WHERE curp = ? AND id_persona != ?", [curp, id_persona]);
      if (curpExists.length) return res.status(400).json({ message: "El CURP ya existe para otra persona" });
      const [result] = await db.query(
        "UPDATE persona SET nombre = ?, apellido_paterno = ?, apellido_materno = ?, genero = ?, direccion = ?, telefono = ?, curp = ?, fecha_nacimiento = ? WHERE id_persona = ?",
        [nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento, id_persona]
      );
      if (result.affectedRows === 0) return res.status(400).json({ message: "No se pudo actualizar la persona" });
      res.status(200).json({
        message: `'${nombre} ${apellido_paterno}' actualizado correctamente`,
        id_persona,nombre,apellido_paterno,apellido_materno,genero,direccion,telefono,curp,fecha_nacimiento
      });
    } catch (error) {
      console.error("Error al actualizar la persona:", error);
      res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};  