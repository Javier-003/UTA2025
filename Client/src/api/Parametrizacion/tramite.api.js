// src/api/tramite.api.js
import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todos los tramites
export const getTramites = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tramite`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los tramites:", error);
    throw new Error('Error al obtener los tramites');
  }
};

// Crear un nuevo tramite
export const createTramite = async (nombre, desde, hasta) => {
  try {
    await axios.post(`${BASE_URL}/tramite/create`, { nombre, desde, hasta , userSession});
  } catch (error) {
    console.error("Error al registrar el tramite:", error);
    throw new Error('Error al registrar el tramite');
  }
};

// Actualizar un tramite existente
export const updateTramite = async (idTramite, nombre, desde, hasta) => {
  try {
    await axios.put(`${BASE_URL}/tramite/update/${idTramite}`, { nombre, desde, hasta ,userSession});
  } catch (error) {
    console.error("Error al actualizar el tramite:", error);
    throw new Error('Error al actualizar el tramite');
  }
};

// Eliminar un registro de tramite
export const deleteTramite = async (idTramite) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tramite/delete/${idTramite}`, { data: { userSession } });
    if (response.status === 200) {
      console.log("Tramite eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el tramite');
      }
    }catch (error) {
    console.error("Error al eliminar Tramite:", error);
    throw new Error('Error al eliminar el Tramite');
  }
};
