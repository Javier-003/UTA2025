// src/api/mapacurricular.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas los mapas curriculares
export const getMapaCurriculares = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/mapacurricular`);
    return response.data.data; // Retorna los datos del mapa curricular
  } catch (error) {
    console.error("Error al obtener las mapa curricular:", error);
    throw new Error('Error al obtener las mapa curricular');
  }
};

// Crear una nuevo mapa curricular
export const createMapaCurricular = async ( id_programa_academico,ciclo,cuatrimestre,materia, clave,
    h_semana,h_teoricas,h_practicas,h_total,creditos,modalidad,espacio) => {
  try {
    await axios.post(`${BASE_URL}/mapacurricular/create`, { 
        id_programa_academico,ciclo,cuatrimestre,materia, clave,
        h_semana,h_teoricas,h_practicas,h_total,creditos,modalidad,espacio
    });
  } catch (error) {
    console.error("Error al registrar la mapa curricular:", error);
    throw new Error('Error al registrar la mapa curricular');
  }
};

// Actualizar un mapa curricular existente
export const updateMapaCurricular = async (id_mapa_curricular, 
    id_programa_academico,ciclo,cuatrimestre,materia, clave,h_semana,h_teoricas,h_practicas,h_total,creditos,modalidad,espacio
) => {
  try {
    await axios.put(`${BASE_URL}/mapacurricular/update/${id_mapa_curricular}`,{ 
        id_programa_academico,ciclo,cuatrimestre,materia, clave,h_semana,h_teoricas,h_practicas,h_total,creditos,modalidad,espacio
    });
  } catch (error) {
    console.error("Error al actualizar el mapa curricular:", error);
    throw new Error('Error al actualizar el mapa curricular');
  }
};

// Eliminar un mapa curricular
export const deleteMapaCurricular = async (id_mapa_curricular) => {
  try {
    await axios.delete(`${BASE_URL}/mapacurricular/delete/${id_mapa_curricular}`);
  } catch (error) {
    console.error("Error al eliminar el mapa curricular:", error);
    throw new Error('Error al eliminar el mapa curricular');
  }
};
