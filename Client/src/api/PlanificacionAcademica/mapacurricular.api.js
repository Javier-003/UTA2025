import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los mapas curriculares
export const getMapaCurriculares = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mapacurricular`);
    return response.data.data; // Retorna los datos del mapa curricular
  } catch (error) {
    console.error("Error al obtener los mapas curriculares:", error);
    throw new Error('Error al obtener los mapas curriculares');
  }
};

// Crear un nuevo mapa curricular
export const createMapaCurricular = async (idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad) => {
  console.log("Enviando datos a la API:", { idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad });
  try {
    await axios.post(`${BASE_URL}/mapacurricular/create`, { 
      idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad
    });
  } catch (error) {
    console.error("Error al registrar el mapa curricular:", error);
    throw new Error('Error al registrar el mapa curricular');
  }
};

// Actualizar un mapa curricular existente
export const updateMapaCurricular = async (idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad) => {
  console.log("Enviando datos actualizar a la API:", { idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad });
  try {
    await axios.put(`${BASE_URL}/mapacurricular/update/${idMapaCurricular}`, {
      idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad
    });
  } catch (error) {
    console.error("Error al actualizar el mapa curricular:", error);
    throw new Error('Error al actualizar el mapa curricular');
  }
};

// Eliminar un mapa curricular
export const deleteMapaCurricular = async (idMapaCurricular) => {
  try {
    await axios.delete(`${BASE_URL}/mapacurricular/delete/${idMapaCurricular}`);
  } catch (error) {
    console.error("Error al eliminar el mapa curricular:", error);
    throw new Error('Error al eliminar el mapa curricular');
  }
};