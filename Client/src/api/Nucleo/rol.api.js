import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;

// Agregar un rol a un usuario
export const agregarRolUsuario = async (idUsuario, idRol) => {
  try {
    const response = await axios.post(`${BASE_URL}/rol/create`, { idUsuario, idRol, userSession });

    // Validar la respuesta
    if (response.status === 200) {
      console.log("Rol agregado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo agregar el rol al usuario');
    }
  } catch (error) {
    console.error("Error al agregar el rol al usuario:", error);
    if (error.response) {
      // Si la respuesta del servidor existe, se obtiene el mensaje de error
      throw new Error(error.response.data.message || 'Error desconocido');
    }
    throw new Error('Error al agregar el rol al usuario');
  }
};

// Eliminar un rol de un usuario
export const eliminarRolUsuario = async (idUsuario, idRol) => {
  try {
    const response = await axios.post(`${BASE_URL}/rol/delete`, { idUsuario, idRol, userSession });
    // Validar la respuesta
    if (response.status === 200) {
      console.log("Rol eliminado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el rol del usuario');
    }
  } catch (error) {
    console.error("Error al eliminar el rol del usuario:", error);
    if (error.response) {
      // Si la respuesta del servidor existe, se obtiene el mensaje de error
      throw new Error(error.response.data.message || 'Error desconocido');
    }
    throw new Error('Error al eliminar el rol del usuario');
  }
};
