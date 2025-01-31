import { db } from "../../db/connection.js";

// Obtener todos los alumnos con datos de la tabla persona
export const getAlumnostodos = async (req, res) => {
  try {
    const [rows] = await db.query(` 
      SELECT 
        alumno.*, 
        persona.nombre, 
        persona.paterno, 
        persona.materno 
      FROM alumno
      INNER JOIN persona ON alumno.idAlumno = persona.idPersona`);
    if (rows.length > 0) {
      res.json({ message: "Alumnos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontró ningún alumno" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const createAlumno = async (req, res) => {
  try {
    const { email, fecha, nss = null } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumno WHERE email = ?", [email]);
    if (exists.length) return res.status(400).json({ message: "El email ya existe" });
    const [result] = await db.query(
      "INSERT INTO alumno (email, fecha, nss) VALUES (?, ?, ?)", 
      [email, fecha, nss]
    );
    res.status(201).json({
      message: `'${email}' creado`, idAlumno: result.insertId, email, fecha, nss
    });
  } catch (error) {
    console.error("Error al crear el alumno:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateAlumno = async (req, res) => {
  try {
    const { idAlumno } = req.params;
    const { email, fecha, nss = null } = req.body;
    const [exists] = await db.query("SELECT 1 FROM alumno WHERE idAlumno = ?", [idAlumno]);
    if (!exists.length) return res.status(404).json({ message: "Alumno no encontrado" });
    const [emailExists] = await db.query("SELECT 1 FROM alumno WHERE email = ? AND idAlumno != ?", [email, idAlumno]);
    if (emailExists.length) return res.status(400).json({ message: "El email ya existe para otro alumno" });
    const [result] = await db.query(
      "UPDATE alumno SET email = ?, fecha = ?, nss = ? WHERE idAlumno = ?",
      [email, fecha, nss, idAlumno]
    );
    if (result.affectedRows === 0) return res.status(400).json({ message: "No se pudo actualizar el alumno" });
    res.status(200).json({
      message: `'${email}' actualizado correctamente`,
      idAlumno, email, fecha, nss
    });
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteAlumno = async (req, res) => {
  try {
    const { idAlumno } = req.params;
    const [alumno] = await db.query("SELECT email FROM alumno WHERE idAlumno = ?", [idAlumno]);
    if (!alumno.length) return res.status(404).json({ message: "Alumno no encontrado" });
    const [result] = await db.query("DELETE FROM alumno WHERE idAlumno = ?", [idAlumno]);
    result.affectedRows
      ? res.status(200).json({ message: `'${alumno[0].email}' eliminado correctamente` })
      : res.status(404).json({ message: "Alumno no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
