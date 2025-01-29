import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas las profesor
export const getProfesores = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/profesor`);
    return response.data.data; // Retorna los datos de el profesor
  } catch (error) {
    console.error("Error al obtener el profesor:", error);
    throw new Error('Error al obtener el profesor');
  }
};

// Crear una nuevo profesor
export const createProfesor = async ( id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc) => {
    try {
      await axios.post(`${BASE_URL}/profesor/create`, {
        id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc
      });
    } catch (error) {
      console.error("Error al registrar el profesor:", error);
      throw new Error('Error al registrar el profesor');
    }
};
  
// Actualizar un profesor existente
export const updateProfesor= async (id_profesor,id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss) => {
    try {
      await axios.put(`${BASE_URL}/profesor/update/${id_profesor}`, {
        id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss
      });
    } catch (error) {
      console.error("Error al actualizar el profesor:", error);
      throw new Error('Error al actualizar el profesor');
    }
};

// Eliminar un profesor
export const deleteProfesor = async (id_profesor) => {
    try {
      await axios.delete(`${BASE_URL}/profesor/delete/${id_profesor}`);
    } catch (error) {
      console.error("Error al eliminar el profesor:", error);
      throw new Error('Error al eliminar el profesor');
    }
};
  