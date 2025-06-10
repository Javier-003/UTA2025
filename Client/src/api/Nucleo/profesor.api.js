import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;

// Obtener todos los profesores
export const getProfesores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profesor`);
    return response.data.data || []; // Retorna los datos de los profesores
  } catch (error) {
    console.error("Error al obtener los profesores:", error);
    throw new Error('Error al obtener los profesores');
  }
};

// Crear un nuevo profesor
export const createProfesor = async (idPersona,idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.post(`${BASE_URL}/profesor/create`, {
      idPersona,idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, userSession
    });
  } catch (error) {
    console.error("Error al registrar el profesor:", error);
    throw new Error('Error al registrar el profesor');
  }
};

// Actualizar un profesor existente
export const updateProfesor = async (idProfesor,idPersona, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.put(`${BASE_URL}/profesor/update/${idProfesor}`, {
      idPersona,idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, userSession
    });
  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    throw new Error('Error al actualizar el profesor');
  }
};

// Eliminar un profesor
export const deleteProfesor = async (idProfesor) => {
  try {
    const response = await axios.delete(`${BASE_URL}/profesor/delete/${idProfesor}`, {
      data: { userSession }  // Aquí usamos 'data' para enviar el cuerpo
    });
    if (response.status === 200) {
      console.log("Profesor eliminado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el profesor');
    }
  } catch (error) {
    console.error("Error al eliminar el profesor:", error);
    throw new Error('Error al eliminar el profesor');
  }
};
