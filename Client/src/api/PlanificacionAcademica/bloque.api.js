import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas los bloques
export const getBloquees = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/bloque`);
      return response.data.data; // Retorna los datos de los bloques
    } catch (error) {
      console.error("Error al obtener los bloques:", error);
      throw new Error('Error al obtener los bloques');
    }
};

// Crear un nuevo bloque
export const createBloque = async (Nombre, Duracion, HoraInicio, HoraFin) => {
    try {
        await axios.post(`${BASE_URL}/bloque/create`, {
            Nombre,
            Duracion,
            HoraInicio,
            HoraFin,
            Desde: null, // Valor por defecto para Desde
            Hasta: null  // Valor por defecto para Hasta
        });
    } catch (error) {
        console.error("Error al registrar el bloque:", error);
        throw new Error('Error al registrar el bloque');
    }
};

// Actualizar un bloque existente
export const updateBloque = async (idBloque, Nombre, Duracion, HoraInicio, HoraFin) => {
    try {
        await axios.put(`${BASE_URL}/bloque/update/${idBloque}`, {
            Nombre,
            Duracion,
            HoraInicio,
            HoraFin,
            Desde: null, // Valor por defecto para Desde
            Hasta: null  // Valor por defecto para Hasta
        });
    } catch (error) {
        console.error("Error al actualizar el bloque:", error);
        throw new Error('Error al actualizar el bloque');
    }
};

// Eliminar un bloque
export const deleteBloque = async (idBloque) => {
    try {
        await axios.delete(`${BASE_URL}/bloque/delete/${idBloque}`);
    } catch (error) {
        console.error("Error al eliminar el bloque:", error);
        throw new Error('Error al eliminar el bloque');
    }
};
