import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los registros de alumno_programa
export const getAlumnosPrograma = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumnopa`);
    return response.data.data; // Retorna los datos de los registros de alumno_programa
  } catch (error) {
    console.error("Error al obtener los registros de alumno_programa:", error);
    throw new Error('Error al obtener los registros de alumno_programa');
  }
};

// Crear un nuevo registro de alumno_programa
export const createAlumnoPrograma = async (idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) => {
  try {
    await axios.post(`${BASE_URL}/alumnopa/create`, {
      idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta
    });
  } catch (error) {
    console.error("Error al registrar el alumno_programa:", error);
    throw new Error('Error al registrar el alumno_programa');
  }
};

// Actualizar un registro de alumno_programa existente
export const updateAlumnoPrograma = async (idAlumnoPrograma, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta) => {
  try {
    await axios.put(`${BASE_URL}/alumnopa/update/${idAlumnoPrograma}`, {
      idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta
    });
  } catch (error) {
    console.error("Error al actualizar el alumno_programa:", error);
    throw new Error('Error al actualizar el alumno_programa');
  }
};

// Eliminar un registro de alumno_programa
export const deleteAlumnoPrograma = async (idAlumnoPrograma) => {
  try {
    await axios.delete(`${BASE_URL}/alumnopa/delete/${idAlumnoPrograma}`);
  } catch (error) {
    console.error("Error al eliminar el alumno_programa:", error);
    throw new Error('Error al eliminar el alumno_programa');
  }
};
