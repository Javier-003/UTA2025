import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')

// Obtener todos los trámites de alumnos
export const getAlumnoTramites = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumnotramite`);
    return response.data.data; // Retorna los datos de los trámites de alumnos
  } catch (error) {
    console.error("Error al obtener los trámites de alumnos:", error);
    throw new Error('Error al obtener los trámites de alumnos');
  }
};

// Crear un nuevo trámite de alumno
export const createAlumnoTramite = async (idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus) => {
  console.log("llegando a api", { idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus });
  try {
    await axios.post(`${BASE_URL}/alumnotramite/create`, { idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus });
  } catch (error) {
    console.error("Error al registrar el trámite de alumno:", error);
    throw new Error('Error al registrar el trámite de alumno');
  }
};

// Actualizar un trámite de alumno existente
export const updateAlumnoTramite = async (idAlumnoTramite, idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus) => {
  try {
    await axios.put(`${BASE_URL}/alumnotramite/update/${idAlumnoTramite}`, {idTramite, idAlumnoPA, idPeriodo, fecha, estatus ,userSession });
    await axios.put(`${BASE_URL}/alumnotramite/update/${idAlumnoTramite}`, { idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus });
  } catch (error) {
    console.error("Error al actualizar el trámite de alumno:", error);
    throw new Error('Error al actualizar el trámite de alumno');
  }
};

// Eliminar trámite de alumno
export const deleteAlumnoTramite = async (idAlumnoTramite) => {
  try {
    const response = await axios.delete(`${BASE_URL}/alumnotramite/delete/${idAlumnoTramite}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el trámite de alumno');
      }
    }catch (error) {
    console.error("Error al eliminar el trámite de alumno:", error);
    throw new Error('Error al eliminar el trámite de alumno');
  }
};
