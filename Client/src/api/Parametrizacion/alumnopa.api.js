import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todos los registros de alumnopa
export const getAlumnoPA = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumnopa`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los registros de alumno pa:", error);
    throw new Error('Error al obtener los registros de alumno pa');
  }
};

// Crear un nuevo registro de alumnopa
export const createalumnoPA = async (idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) => {
  try {
    const response = await axios.post(`${BASE_URL}/alumnopa/create`, {
      idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, userSession
    });
    console.log("Respuesta del servidor:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else {
      console.error("Error al registrar el alumnopa:", error);
    }
    throw new Error('Error al registrar el alumnopa');
  }
};

// Actualizar un registro de alumnopa existente
export const updatealumnoPA = async (idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) => {
  try {
    await axios.put(`${BASE_URL}/alumnopa/update/${idAlumnoPA}`, {idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta , userSession });
  } catch (error) {
    console.error("Error al actualizar el alumnopa:", error);
    throw new Error('Error al actualizar el alumnopa');
  }
};

// TRANSACCIÓN
export const transaccionUpdateAlumnopa = async (idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) => {
  console.log("Datos enviados UPDATE api:", {idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta});
  try {
    await axios.put(`${BASE_URL}/alumnopa/update2/${idAlumnoPA}`, {idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta , userSession });
  } catch (error) {
    console.error("Error al actualizar el alumnopa:", error);
    throw new Error('Error al actualizar el alumnopa');
  }
};


// Eliminar un registro de alumnopa  
export const deletealumnoPA = async (idAlumnoPA) => {
  try {
    const response = await axios.delete(`${BASE_URL}/alumnopa/delete/${idAlumnoPA}`, { data: { userSession } });
    if (response.status === 200) {
      console.log("Actividad eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el Administrativo');
      }
    }catch (error) {
    console.error("Error al eliminar el alumno pa:", error);
    throw new Error('Error al eliminar el alumno pa');
  }
};
