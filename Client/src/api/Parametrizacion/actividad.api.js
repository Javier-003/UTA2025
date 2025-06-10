// src/api/actividad.api.js
import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todas las actividades
export const getActividades = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/actividad`);
    return response.data.data || []; 
  } catch (error) {
    throw new Error('Error al obtener las actividades',error);
  }
};

// Crear una nueva actividad
export const createActividad = async (nombre) => {
  try {
    await axios.post(`${BASE_URL}/actividad/create`, { 
      nombre: nombre , userSession
    });
  } catch (error) {
    console.error("Error al registrar la actividad:", error);
    throw new Error('Error al registrar la actividad');
  }
};

// Actualizar una actividad existente
export const updateActividad = async (IdActividad, nombre) => {
  try {
    await axios.put(`${BASE_URL}/actividad/update/${IdActividad}`, { 
      nombre: nombre ,userSession
    });
  } catch (error) {
    console.error("Error al actualizar la actividad:", error);
    throw new Error('Error al actualizar la actividad');
  }
};

// Eliminar una actividad
export const deleteActividad = async (IdActividad) => {
  try {
    const response = await axios.delete(`${BASE_URL}/actividad/delete/${IdActividad}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      console.log("Actividad eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el Administrativo');
      }
    }catch (error) {
    throw new Error('Error al eliminar la actividad',error);
  }
};
