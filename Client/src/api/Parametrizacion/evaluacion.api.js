import axios from "axios";

const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username');
axios.defaults.withCredentials = true;
// Obtener todos los registros de evaluacion
export const getEvaluacion = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/evaluacion`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los registros de evaluación:", error);
    throw new Error('Error al obtener los registros de evaluación');
  }
};

// Crear una nueva evaluación
export const createEvaluacion = async (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) => {
  try {
    const response = await axios.post(`${BASE_URL}/evaluacion/create`, {
      idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus, userSession
    });
    console.log("Respuesta del servidor:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else {
      console.error("Error al registrar la evaluación:", error);
    }
    throw new Error('Error al registrar la evaluación');
  }
};

// Actualizar una evaluación existente
export const updateEvaluacion = async (idEvaluacion, idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) => {
  try {
    await axios.put(`${BASE_URL}/evaluacion/update/${idEvaluacion}`, {
      idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus, userSession
    });
  } catch (error) {
    console.error("Error al actualizar la evaluación:", error);
    throw new Error('Error al actualizar la evaluación');
  }
};

// Eliminar una evaluación
export const deleteEvaluacion = async (idEvaluacion) => {
  try {
    const response = await axios.delete(`${BASE_URL}/evaluacion/delete/${idEvaluacion}`, { data: { userSession } });
    if (response.status === 200) {
      console.log("Evaluación eliminada correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar la evaluación');
    }
  } catch (error) {
    console.error("Error al eliminar la evaluación:", error);
    throw new Error('Error al eliminar la evaluación');
  }
};
