import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/usuario`);
    return response.data.data || []; // Retorna los datos de los usuarios
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw new Error('Error al obtener los usuarios');
  }
};
// Crear un nuevo usuario
export const createUsuario = async ( idPersona, usuario, contrasena, estatus, idRol) => {
  try {
    const response = await axios.post(`${BASE_URL}/usuario/create`, {
      idPersona, usuario, contrasena, estatus, idRol, userSession
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Usuario creado:", response.data);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error('Error al registrar el usuario');
  }
};

// Actualizar un usuario existente
export const updateUsuario = async (idUsuario, idPersona, usuario, contrasena, estatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/usuario/update/${idUsuario}`, {
      idPersona, usuario, contrasena, estatus, userSession
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Usuario actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error('Error al actualizar el usuario');
  }
};

// Eliminar un usuario
export const deleteUsuario = async (idUsuario) => {
  try {
    const response = await axios.delete(`${BASE_URL}/usuario/delete/${idUsuario}`, {
      data: { userSession }  // Aquí usamos 'data' para enviar el cuerpo
    });
    if (response.status === 200) {
      console.log("Usuario eliminado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el usuario');
    }
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error('Error al eliminar el usuario');
  }
};
