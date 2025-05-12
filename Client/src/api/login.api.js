
// src/api/login.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
axios.defaults.withCredentials = true;

export const accessLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/access`, {
      Username: username,
      Password: password
    });

    if (response.status === 200 && response.data?.message === 'Autenticación exitosa') {
      return {
        success: true
      };
    } else {
      return {
        success: false,
        message: response.data.message
      };
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;  // Lanzar error para ser manejado en el componente
  }
};

export const getSession = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/login/session`);
    console.log(response.data.username)
    localStorage.setItem('Rol', response.data.rol);
    localStorage.setItem('Username', response.data.username);
    return response.data; // { Username, Rol }
  } catch (error) {
    console.error('Error al obtener sesión:', error.response?.data || error.message);
    return null;
  }
};

export const forgotLogin = async (username) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/olvidaste`, {
      Username: username,
    });

    if (response.status === 200) {
      return response.data.Username; // Devuelve el nombre de usuario encontrado
    } else {
      throw new Error(response.data.message); // Lanza un error si la respuesta no es 200
    }
  } catch (error) {
    console.error("Error al recuperar usuario:", error);
    throw new Error(error.response?.data?.message || "Error de conexión"); // Mensaje de error más claro
  }
};

export const changePassword = async (username, newPassword, repeatPassword) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/recuperar/${username}`, {
      newPassword,
      repeatPassword,
    });

    if (response.status === 200) {
      return response.data.message; // Devuelve el mensaje de éxito
    } else {
      throw new Error(response.data.message); // Lanza un error si la respuesta no es 200
    }
  } catch (error) {
    console.error("Error al cambiar la contraseña:", error);
    throw new Error(error.response?.data?.message || "Error de conexión"); // Mensaje de error más claro
  }
};

export const logoutLogin = async()  => {
  const response = await axios.post(`${BASE_URL}/login/logout`)
  return response.data
}
