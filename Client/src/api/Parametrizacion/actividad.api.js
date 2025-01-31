// src/api/actividad.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas las actividades
export const getActividades = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/actividad`);
    return response.data.data; // Retorna los datos de las actividades
  } catch (error) {
    console.error("Error al obtener las actividades:", error);
    throw new Error('Error al obtener las actividades');
  }
};

// Crear una nueva actividad
export const createActividad = async (nombre) => {
  try {
    await axios.post(`${BASE_URL}/actividad/create`, { nombre: nombre });
  } catch (error) {
    console.error("Error al registrar la actividad:", error);
    throw new Error('Error al registrar la actividad');
  }
};

// Actualizar una actividad existente
export const updateActividad = async (IdActividad, nombre) => {
  try {
    await axios.put(`${BASE_URL}/actividad/update/${IdActividad}`, { nombre: nombre });
  } catch (error) {
    console.error("Error al actualizar la actividad:", error);
    throw new Error('Error al actualizar la actividad');
  }
};

// Eliminar una actividad
export const deleteActividad = async (IdActividad) => {
  try {
    await axios.delete(`${BASE_URL}/actividad/delete/${IdActividad}`);
  } catch (error) {
    console.error("Error al eliminar la actividad:", error);
    throw new Error('Error al eliminar la actividad');
  }
};
