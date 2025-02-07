import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Crear un rol
export const createRol = async (nombre) => {
  try {
    await axios.post(`${BASE_URL}/rol/create`, { nombre });
  } catch (error) {
    console.error("Error al registrar el rol:", error);
    throw new Error('Error al registrar el rol');
  }
};

// Eliminar un rol
export const deleteRol = async (idRol) => {
  try {
    await axios.delete(`${BASE_URL}/rol/delete/${idRol}`);
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    throw new Error('Error al eliminar el rol');
  }
};
