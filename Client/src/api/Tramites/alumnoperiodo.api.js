import axios from "axios";

import { BASE_URL } from '../config'; 
axios.defaults.withCredentials = true;

// Obtener todos los registros de kardex
export const getAlumnoPeriodo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/alumnoperiodo`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los registros del periodo del alumno:", error);
    throw new Error('Error al obtener los registros del periodo del alumno');
  }
};

