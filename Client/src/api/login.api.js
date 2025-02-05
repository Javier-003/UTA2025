// src/api/login.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

export const accessLogin = async (username, password) => {
  try {
    const response = await axios.post(`${BASE_URL}/login/access`, {
      Username: username,
      Password: password
    });

    if (response.data.Token) {
      localStorage.setItem('token', response.data.Token);
      localStorage.setItem('Username', response.data.Username);
      return response.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    throw error;  // Lanzar error para ser manejado en el componente
  }
};

export const logoutLogin = async()  => {
  const response = await axios.post(`${BASE_URL}/login/logout`)
  return response.data
}
