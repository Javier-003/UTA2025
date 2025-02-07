import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Agregar un rol a un usuario
export const agregarRolUsuario = async (idUsuario, idRol) => {
  try {
    await axios.post(`${BASE_URL}/rolUsuario/agregar`, { idUsuario, idRol });
  } catch (error) {
    console.error("Error al agregar el rol al usuario:", error);
    throw new Error('Error al agregar el rol al usuario');
  }
};

// Eliminar un rol de un usuario
export const eliminarRolUsuario = async (idUsuario, idRol) => {
  try {
    await axios.post(`${BASE_URL}/rolUsuario/eliminar`, { idUsuario, idRol });
  } catch (error) {
    console.error("Error al eliminar el rol del usuario:", error);
    throw new Error('Error al eliminar el rol del usuario');
  }
};
