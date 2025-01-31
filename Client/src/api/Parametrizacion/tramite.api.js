// src/api/tramite.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los tramites
export const getTramites = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tramite`);
    return response.data.data; // Retorna los datos de los tramites
  } catch (error) {
    console.error("Error al obtener los tramites:", error);
    throw new Error('Error al obtener los tramites');
  }
};

// Crear un nuevo tramite
export const createTramite = async (nombre, desde, hasta) => {
  try {
    await axios.post(`${BASE_URL}/tramite/create`, { nombre, desde, hasta });
  } catch (error) {
    console.error("Error al registrar el tramite:", error);
    throw new Error('Error al registrar el tramite');
  }
};

// Actualizar un tramite existente
export const updateTramite = async (IdTramite, nombre, desde, hasta) => {
  try {
    await axios.put(`${BASE_URL}/tramite/update/${IdTramite}`, { nombre, desde, hasta });
  } catch (error) {
    console.error("Error al actualizar el tramite:", error);
    throw new Error('Error al actualizar el tramite');
  }
};

// Eliminar un tramite
export const deleteTramite = async (IdTramite) => {
  try {
    await axios.delete(`${BASE_URL}/tramite/delete/${IdTramite}`);
  } catch (error) {
    console.error("Error al eliminar el tramite:", error);
    throw new Error('Error al eliminar el tramite');
  }
};
