import { db } from "../../db/connection.js";

// Obtener todos los profesores con su información de persona
export const getAdicionProfesoresTodos = async (req, res) => {
  try {
    const query = `
      SELECT p.idProfesor, p.idDepartamento, p.idPuesto, p.clave, p.perfil, 
             p.email, p.noCedula, p.programaAcademicos, p.nss, p.rfc,
             per.idPersona, per.nombre, per.paterno, per.materno, 
             per.nacimiento, per.curp, per.genero, per.direccion, per.telefono
      FROM profesor p
      INNER JOIN persona per ON per.idPersona = p.idProfesor
    `;
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener los profesores:", error);
    res.status(500).json({ error: "Error al obtener los profesores" });
  }
};


// Crear un nuevo profesor
export const createAdicionProfesor = async (req, res) => {
  const { nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc } = req.body;

  try {
    // Insertar en la tabla persona
    const [personaResult] = await db.query(
      `INSERT INTO persona (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono]
    );

    const idPersona = personaResult.insertId; // Obtener el ID de persona recién creado

    // Insertar en la tabla profesor
    await db.query(
      `INSERT INTO profesor (idProfesor, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc]
    );

    res.status(201).json({ message: "Profesor añadido exitosamente", idProfesor: idPersona });
  } catch (error) {
    console.error("Error al añadir profesor:", error);
    res.status(500).json({ error: "Error al añadir profesor" });
  }
};


// Actualizar un profesor
export const updateAdicionProfesor = async (req, res) => {
  const { idAdicionProfesor } = req.params; // Aquí se recibe el ID desde la URL
  const { idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc } = req.body;

  if (!idAdicionProfesor) {
    return res.status(400).json({ error: "ID del profesor no proporcionado en la URL" });
  }

  try {
    // Verificar si el profesor existe
    const [profesorResult] = await db.query('SELECT idProfesor FROM profesor WHERE idProfesor = ?', [idAdicionProfesor]);

    if (profesorResult.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    // Actualizar en la tabla `persona`
    await db.query(
      `UPDATE persona 
      SET nombre = ?, paterno = ?, materno = ?, nacimiento = ?, curp = ?, genero = ?, direccion = ?, telefono = ? 
      WHERE idPersona = ?`,
      [nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idPersona]
    );

    // Actualizar en la tabla `profesor`
    await db.query(
      `UPDATE profesor 
      SET idDepartamento = ?, idPuesto = ?, clave = ?, perfil = ?, email = ?, noCedula = ?, programaAcademicos = ?, nss = ?, rfc = ? 
      WHERE idProfesor = ?`,
      [idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, idAdicionProfesor]
    );

    res.json({ message: "Profesor actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    res.status(500).json({ error: "Error al actualizar el profesor" });
  }
};


// Eliminar un profesor
export const deleteAdicionProfesor = async (req, res) => {
  const { idAdicionProfesor } = req.params;

  if (!idAdicionProfesor) {
    return res.status(400).json({ error: "ID del profesor no proporcionado" });
  }

  try {
    const [profesorResult] = await db.query(
      "SELECT * FROM profesor WHERE idProfesor = ?",
      [idAdicionProfesor]
    );

    if (profesorResult.length === 0) {
      return res.status(404).json({ error: "Profesor no encontrado" });
    }

    await db.query(
      "DELETE FROM profesor WHERE idProfesor = ?",
      [idAdicionProfesor]
    );

    res.json({ message: "Profesor eliminado correctamente" });
  } catch (error) {
    console.error("❌ Error al eliminar el profesor:", error);
    res.status(500).json({ error: "Error al eliminar el profesor" });
  }
};
