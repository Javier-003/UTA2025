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

// Crear una nuevo alumno
export const createAlumno = async (email,promedio,cuatrimestre,fecha_registro,nss) => {
  try {
    await axios.post(`${BASE_URL}/alumno/create`, {
      email,promedio,cuatrimestre,fecha_registro,nss
    });
  } catch (error) {
    console.error("Error al registrar la alumno:", error);
    throw new Error('Error al registrar la alumno');
  }
};

// Actualizar una alumno existente
export const updateAlumno = async (id_alumno, email,promedio,cuatrimestre,fecha_registro,nss) => {
  try {
    await axios.put(`${BASE_URL}/alumno/update/${id_alumno}`, {
      email,promedio,cuatrimestre,fecha_registro,nss
    });
  } catch (error) {
    console.error("Error al actualizar el alumno:", error);
    throw new Error('Error al actualizar el alumno');
  }
};


// Eliminar un alumno
export const deleteAlumno = async (id_alumno) => {
    try {
      await axios.delete(`${BASE_URL}/alumno/delete/${id_alumno}`);
    } catch (error) {
      console.error("Error al eliminar el alumno:", error);
      throw new Error('Error al eliminar el alumno');
    }
};
  