import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todas los bloques
export const getBloquees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bloque`);
      return response.data.data || []; 
    } catch (error) {
      console.error("Error al obtener los bloques:", error);
      throw new Error('Error al obtener los bloques');
    }
};

// Crear un nuevo bloque
export const createBloque = async (nombre, duracion, horaInicio, horaFin) => {
    try {
        await axios.post(`${BASE_URL}/bloque/create`, {
            nombre, duracion, horaInicio, horaFin, desde: null, hasta: null, userSession
        });
    } catch (error) {
        console.error("Error al registrar el bloque:", error);
        throw new Error('Error al registrar el bloque');
    }
};

// Actualizar un bloque existente
export const updateBloque = async (idBloque, nombre, duracion, horaInicio, horaFin) => {
    try {
        await axios.put(`${BASE_URL}/bloque/update/${idBloque}`, {
            nombre, duracion, horaInicio, horaFin, desde: null,hasta: null, userSession
         });
    } catch (error) {
        console.error("Error al actualizar el bloque:", error);
        throw new Error('Error al actualizar el bloque');
    }
};

// Eliminar una bloque
export const deleteBloque = async (idBloque) => {
    try {
      const response = await axios.delete(`${BASE_URL}/bloque/delete/${idBloque}`, {
        data: { userSession } 
      });
      if (response.status === 200) {
        console.log("Bloque eliminado correctamente:", response.data);
        return response.data; 
      } else {
        throw new Error('No se pudo eliminar el bloque');
        }
      }catch (error) {
      throw new Error('Error al eliminar el bloque',error);
    }
  };
  