import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todos los mapas curriculares
export const getMapaCurriculares = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mapacurricular`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los mapas curriculares:", error);
    throw new Error('Error al obtener los mapas curriculares');
  }
};

// Crear un nuevo mapa curricular
export const createMapaCurricular = async (idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad) => {
  // console.log("Datos enviados al backend para crear:", { idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, userSession });
  try {
    await axios.post(`${BASE_URL}/mapacurricular/create`, { 
      idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas,
      horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, userSession
    });
  } catch (error) {
    console.error("Error al registrar el mapa curricular:", error);
    throw new Error('Error al registrar el mapa curricular');
  }
};

// Actualizar un mapa curricular existente
export const updateMapaCurricular = async (idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad) => {
  // console.log("Datos enviados al backend para actualizar:", { idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, userSession });
  try {
    await axios.put(`${BASE_URL}/mapacurricular/update/${idMapaCurricular}`, {
      idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, 
      horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, userSession
    });
  } catch (error) {
    console.error("Error al actualizar el mapa curricular:", error);
    throw new Error('Error al actualizar el mapa curricular');
  }
};

// Eliminar uun mapa curricular
export const deleteMapaCurricular = async (idMapaCurricular) => {
  try {
    const response = await axios.delete(`${BASE_URL}/mapacurricular/delete/${idMapaCurricular}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      console.log("Mapa Curricular eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el mapa curricular');
      }
    }catch (error) {
    throw new Error('Error al eliminar el mapa curricular',error);
  }
};
