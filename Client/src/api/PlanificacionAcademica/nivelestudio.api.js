// src/api/nivelestudio.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas las nivelestudio
export const getnivelestudios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/nivelestudio`);
    return response.data.data; // Retorna los datos de las nivelestudio
  } catch (error) {
    console.error("Error al obtener los nivel de estudio:", error);
    throw new Error('Error al obtener el nivel de estudio');
  }
};

// Crear una nueva nivelestudio
export const createNivelEstudio = async (nombre, descripcion, sigla) => {
  try {
    await axios.post(`${BASE_URL}/nivelestudio/create`, { nombre, descripcion, sigla });
  } catch (error) {
    console.error("Error al registrar el nivelestudio:", error);
    throw new Error('Error al registrar el nivelestudio');
  }
};

// Actualizar un nivelestudio existente
export const updateNivelEstudio = async (idnivelEstudio, nombre, descripcion, sigla) => {
  try {
    await axios.put(`${BASE_URL}/nivelestudio/update/${idnivelEstudio}`, { nombre, descripcion, sigla });
  } catch (error) {
    console.error("Error al actualizar el nivel de estudio:", error);
    throw new Error('Error al actualizar el nivel de estudio');
  }
};

// Eliminar un nivel estudio
export const deleteNivelEstudio = async (idnivelEstudio) => {
  try { 
    await axios.delete(`${BASE_URL}/nivelestudio/delete/${idnivelEstudio}`);
  } catch (error) {
    console.error("Error al eliminar el nivel estudio:", error);
    throw new Error('Error al eliminar el nivel estudio');
  }
};
