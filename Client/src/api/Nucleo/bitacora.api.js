// src/api/bitacora.api.js
import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
axios.defaults.withCredentials = true;

// Obtener todas las bitacoras
export const getBitacoras = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/bitacora`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener bitacora:", error);
    throw new Error('Error al obtener  bitacora');
  }
};
