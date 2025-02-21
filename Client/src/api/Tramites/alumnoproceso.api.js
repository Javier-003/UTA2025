import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')

// Obtener todos los procesos de alumnos
export const getAlumnoProcesos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumnoproceso`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los procesos de alumnos:", error);
    throw new Error('Error al obtener los procesos de alumnos');
  }
};

// Crear un nuevo proceso de alumno
export const createAlumnoProceso = async (idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion) => {
  try {
    await axios.post(`${BASE_URL}/alumnoproceso/create`, {
      idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion,userSession 
    });
  } catch (error) {
    console.error("Error al registrar el proceso de alumno:", error);
    throw new Error('Error al registrar el proceso de alumno');
  }
};

// Actualizar un proceso de alumno existente
export const updateAlumnoProceso = async (idAlumnoProceso, idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion) => {
  try {
    await axios.put(`${BASE_URL}/alumnoproceso/update/${idAlumnoProceso}`, {
      idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion , userSession
    });
  } catch (error) {
    console.error("Error al actualizar el proceso de alumno:", error);
    throw new Error('Error al actualizar el proceso de alumno');
  }
};

// Eliminar proceso de alumno
export const deleteAlumnoProceso = async (idAlumnoProceso) => {
  try {
    const response = await axios.delete(`${BASE_URL}/alumnoproceso/delete/${idAlumnoProceso}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el Proceso de Alumno');
      }
    }catch (error) {
    console.error("Error al eliminar el proceso de alumno:", error);
    throw new Error('Error al eliminar el proceso de alumno');
  }
};
