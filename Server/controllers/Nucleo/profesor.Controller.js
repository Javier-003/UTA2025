import { db } from "../../db/connection.js";

// Obtener todos los Profesores con datos de la tabla persona
export const getProfesortodos = async (req, res) => {
  try {
    const query = `
      SELECT 
        p.*, 
        persona.idPersona,
        persona.nombre,
        persona.paterno,
        persona.materno, 
        d.nombre AS nombreDepartamento, 
        pu.nombre AS nombrePuesto
        FROM profesor p
        JOIN departamento d ON p.idDepartamento = d.idDepartamento
        JOIN puesto pu ON p.idPuesto = pu.idPuesto
        JOIN persona ON p.idProfesor = persona.idPersona`;
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

//Crear un Profesor
export const createProfesor = async (req, res) => {
  try {
    const { idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc } = req.body;
    if (!idPersona || !idDepartamento || !idPuesto || !clave || !perfil || !email || !noCedula || !programaAcademicos || !nss || !rfc) {
      return res.status(400).json({ message: "Todos los campos son requeridos: idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc" });
    }
    const [exists] = await db.query("SELECT 1 FROM profesor WHERE email = ?", [email]);
    if (exists.length) {
      return res.status(400).json({ message: "El email del profesor ya existe" });
    }
    const [result] = await db.query(
      "INSERT INTO profesor (idProfesor,idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc]
    );    
    res.status(201).json({
      message: `'${email}' creado`,
      idProfesor: result.insertId,
      idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al crear profesor:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

//Actualizar un profesor 
export const updateProfesor = async (req, res) => {
  try {
    const { idProfesor } = req.params;
    const { idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc } = req.body;
    const [exists] = await db.query("SELECT 1 FROM profesor WHERE idProfesor = ?", [idProfesor]);
    if (!exists.length) {
      return res.status(404).json({ message: "El Profesor no existe" });
    }
    const [result] = await db.query(
      "UPDATE profesor SET idDepartamento = ?, idPuesto = ?, clave = ?, perfil = ?, email = ?, noCedula = ?, programaAcademicos = ?, nss = ?, rfc = ? WHERE idProfesor = ?",
      [idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, idProfesor]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el profesor" });
    }
    res.status(200).json({
      message: `'${email}' actualizado correctamente`,idProfesor, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const deleteProfesor = async (req, res) => {
  try {
    const { idProfesor } = req.params;
    const [profesor] = await db.query("SELECT clave FROM profesor WHERE idProfesor = ?", [idProfesor]);
    if (!profesor.length) return res.status(404).json({ message: "Profesor no encontrado" });
    const [rows] = await db.query("DELETE FROM profesor WHERE idProfesor = ?", [idProfesor]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${profesor[0].clave}' eliminado correctamente` })
      : res.status(404).json({ message: "Profesor no encontrado" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};
