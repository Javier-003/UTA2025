import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los alumnos
export const getAlumnos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumno`);
    return response.data.data; // Retorna los datos de los alumnos
  } catch (error) {
    console.error("Error al obtener los alumnos:", error);
    throw new Error('Error al obtener los alumnos');
  }
};

// Crear un nuevo alumno
export const createAlumno = async (email, nss, fecha) => {
  try {
    await axios.post(`${BASE_URL}/alumno/create`, {
      email, nss, fecha
    });
  } catch (error) {
    console.error("Error al registrar el alumno:", error);
    throw new Error('Error al registrar el alumno');
  }
};

// Actualizar un alumno existente
export const updateAlumno = async (idAlumno, email, nss, fecha) => {
  try {
    await axios.put(`${BASE_URL}/alumno/update/${idAlumno}`, {
      email, nss, fecha
    });
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    throw new Error('Error al actualizar el alumno');
  }
};

// Eliminar un alumno
export const deleteAlumno = async (idAlumno) => {
  try {
    await axios.delete(`${BASE_URL}/alumno/delete/${idAlumno}`);
  } catch (error) {
    console.error("Error al eliminar el alumno:", error);
    throw new Error('Error al eliminar el alumno');
  }
};
