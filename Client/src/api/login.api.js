// src/api/login.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Entra al Login
export const accessLogin = async (username, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login/access`, {
        Username: username,
        Password: password
        })
      if(response.data.Token){
        localStorage.setItem('token', response.data.Token)
        localStorage.setItem('Username', response.data.Username)
        return response.data;
      } else {
        return response.data.message;
      }
    } catch (error) {
      console.error("Error al iniciar sesion:", error);
    }
};

export const logoutLogin = async()  => {
  const response = await axios.post(`${BASE_URL}/login/logout`)
  return response.data
}
