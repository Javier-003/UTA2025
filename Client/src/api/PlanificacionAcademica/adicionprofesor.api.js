import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config';
axios.defaults.withCredentials = true;

// Obtener todos los profesores con su información de persona
export const getAdicionProfesoresTodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/adicionprofesor`);
    if (!response.data || typeof response.data !== "object") {
      console.error("⚠️ La API no devolvió datos válidos:", response.data);
      return [];
    }
    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener los adicionprofesores:", error);
    return [];
  }
};

// Crear un nuevo profesor
export const createAdicionProfesor = async (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.post(`${BASE_URL}/adicionprofesor/create`, {
      nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al registrar el profesor:", error);
    throw new Error('Error al registrar el profesor');
  }
};

// Actualizar un profesor existente
export const updateAdicionProfesor = async (idProfesor, idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.put(`${BASE_URL}/adicionprofesor/update/${idProfesor}`, {
      idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    throw new Error('Error al actualizar el profesor');
  }
};

// Eliminar un profesor
export const deleteAdicionProfesor = async (idProfesor) => {
  try {
    await axios.delete(`${BASE_URL}/adicionprofesor/delete/${idProfesor}`);
  } catch (error) {
    console.error("❌ Error al eliminar el profesor:", error);
    throw new Error("Error al eliminar el profesor");
  }
};

