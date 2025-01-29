import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los usuarios
export const getUsuarios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/usuario`);
    return response.data.data; // Retorna los datos de los usuarios
  } catch (error) {
    console.error("Error al obtener los usuarios:", error);
    throw new Error('Error al obtener los usuarios');
  }
};

// Crear un nuevo usuario
export const createUsuario = async (id_persona, usuario, contrasena, estatus) => {
  try {
    const response = await axios.post(`${BASE_URL}/usuario/create`, {
      id_persona, usuario, contrasena, estatus
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Usuario creado:", response.data);
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    throw new Error('Error al registrar el usuario');
  }
};

// Actualizar un usuario existente
export const updateUsuario = async (id_user, id_persona, usuario, contrasena, estatus) => {
  try {
    const response = await axios.put(`${BASE_URL}/usuario/update/${id_user}`, {
      id_persona, usuario, contrasena, estatus
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Usuario actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el usuario:", error);
    throw new Error('Error al actualizar el usuario');
  }
};

// Eliminar un usuario
export const deleteUsuario = async (id_user) => {
  try {
    const response = await axios.delete(`${BASE_URL}/usuario/delete/${id_user}`);
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Usuario eliminado:", response.data);
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    throw new Error('Error al eliminar el usuario');
  }
};
