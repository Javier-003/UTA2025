import { db } from "../../db/connection.js";

// Obtener todos los Profesores con datos de la tabla persona
export const getProfesortodos = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        persona.nombre, 
        persona.apellido_paterno, 
        persona.apellido_materno,
        d.Nombre AS NombreDepartamento, 
        pu.Nombre AS NombrePuesto
      FROM profesor p
      JOIN departamento d ON p.id_departamento = d.id_departamento
      JOIN puesto pu ON p.id_puesto = pu.id_puesto
      JOIN persona ON p.id_profesor = persona.id_persona
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Profesores obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron profesores" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

  
// Crear un Profesor
export const createProfesor = async (req, res) => {
  try {
    const { id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc } = req.body;
    if (!id_departamento || !id_puesto || !clave || !perfil || !email || !no_cedula || !programa_academicos || !nss || !rfc) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc" });
    }
    const [exists] = await db.query("SELECT 1 FROM profesor WHERE email = ?", [email]);
    if (exists.length) {
      return res.status(400).json({ message: "El email del profesor ya existe" });
    }
    const [result] = await db.query(
      "INSERT INTO profesor (id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc]
    );
    res.status(201).json({
      message: `'${email}' creado`,
      id_profesor: result.insertId,
      id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al crear profesor:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

// Actualizar un Profesor
export const updateProfesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const { id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc } = req.body;
    const [exists] = await db.query("SELECT 1 FROM profesor WHERE id_profesor = ?", [id_profesor]);
    if (!exists.length) {
      return res.status(404).json({ message: "El Profesor no existe" });
    }
    const [result] = await db.query(
      "UPDATE profesor SET id_departamento = ?, id_puesto = ?, clave = ?, perfil = ?, email = ?, no_cedula = ?, programa_academicos = ?, nss = ?, rfc = ? WHERE id_profesor = ?",
      [id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc, id_profesor]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el profesor" });
    }
    res.status(200).json({
      message: `'${email}' actualizado correctamente`,
      id_profesor, id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error });
  }
};

// Eliminar un Profesor
export const deleteProfesor = async (req, res) => {
  try {
    const { id_profesor } = req.params;
    const [profesor] = await db.query("SELECT clave FROM profesor WHERE id_profesor = ?", [id_profesor]);
    if (!profesor.length) return res.status(404).json({ message: "Profesor no encontrado" });
    const [rows] = await db.query("DELETE FROM profesor WHERE id_profesor = ?", [id_profesor]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${profesor[0].clave}' eliminado correctamente` })
      : res.status(404).json({ message: "Profesor no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
