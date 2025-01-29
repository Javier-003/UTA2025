import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Crear un rol
export const createRol = async (id_usuario, id_rol) => {
  try {
    await axios.post(`${BASE_URL}/rol/create`, { id_usuario, id_rol });
  } catch (error) {
    console.error("Error al registrar el rol:", error);
    throw new Error('Error al registrar el rol');
  }
};

// Eliminar un rol
export const deleteRol = async (id_usuario, id_rol) => {
  try {
    await axios.delete(`${BASE_URL}/rol/delete`, { data: { id_usuario, id_rol } });
  } catch (error) {
    console.error("Error al eliminar el rol:", error);
    throw new Error('Error al eliminar el rol');
  }
};
