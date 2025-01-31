import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los profesores
export const getProfesores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profesor`);
    return response.data.data; // Retorna los datos de los profesores
  } catch (error) {
    console.error("Error al obtener los profesores:", error);
    throw new Error('Error al obtener los profesores');
  }
};

// Crear un nuevo profesor
export const createProfesor = async (idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.post(`${BASE_URL}/profesor/create`, {
      idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al registrar el profesor:", error);
    throw new Error('Error al registrar el profesor');
  }
};

// Actualizar un profesor existente
export const updateProfesor = async (idProfesor, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.put(`${BASE_URL}/profesor/update/${idProfesor}`, {
      idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    throw new Error('Error al actualizar el profesor');
  }
};

// Eliminar un profesor
export const deleteProfesor = async (idProfesor) => {
  try {
    await axios.delete(`${BASE_URL}/profesor/delete/${idProfesor}`);
  } catch (error) {
    console.error("Error al eliminar el profesor:", error);
    throw new Error('Error al eliminar el profesor');
  }
};
