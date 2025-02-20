import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')

// Obtener todos los alumnos
export const getAlumnos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumno`);
    return response.data.data || []; // Retorna un array vacío si no hay alumnos
  } catch (error) {
    console.error("Error al obtener los alumnos:", error);
    throw new Error(error.response?.data?.message || 'Error al obtener los alumnos');
  }
};

// Crear un nuevo alumno
export const createAlumno = async (idPersona, email, fecha, nss = null) => {
  try {
    const response = await axios.post(`${BASE_URL}/alumno/create`, {
      idPersona, email, fecha, nss, userSession
    });
    return response.data;
  } catch (error) {
    console.error("Error al registrar el alumno:", error);
    throw new Error(error.response?.data?.message || 'Error al registrar el alumno');
  }
};

// Actualizar un alumno existente
export const updateAlumno = async (idAlumno, email, fecha, nss = null) => {
  try {
    const response = await axios.put(`${BASE_URL}/alumno/update/${idAlumno}`, {
      email, fecha, nss, userSession
    });
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    throw new Error(error.response?.data?.message || 'Error al actualizar el alumno');
  }
};

// Eliminar un alumno
export const deleteAlumno = async (idAlumno) => {
  try {
    const response = await axios.delete(`${BASE_URL}/alumno/delete/${idAlumno}`, {
      data: { userSession } });
    if (response.status === 200) {
      console.log("Alumno eliminada correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el Alumno');
    }
  } catch (error) {
    console.error("Error al eliminar el alumno:", error);
    throw new Error(error.response?.data?.message || 'Error al eliminar el Alumno');
  }
};
