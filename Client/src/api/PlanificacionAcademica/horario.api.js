import axios from "axios";

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Función para obtener todos los horarios
export const getHorario = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/horario`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener horarios:", error.response?.data || error.message);
    return { error: "No se pudo obtener los horarios." };
  }
};

// Función para crear un horario
export const createHorario = async (horario) => {
  try {
    const response = await axios.post(`${BASE_URL}/horario/create`, horario , userSession);
    return response.data;
  } catch (error) {
    console.error("Error al crear horario:", error.response?.data || error.message);
    return { error: "No se pudo crear el horario." };
  }
};

// Función para actualizar un horario
export const updateHorario = async (idHorario, horario) => {
  try {
    const response = await axios.put(`${BASE_URL}/horario/update/${idHorario}`, horario , userSession);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar horario:", error.response?.data || error.message);
    return { error: "No se pudo actualizar el horario." };
  }
};

// Eliminar una horario
export const deleteHorario = async (idHorario) => {
  try {
    const response = await axios.delete(`${BASE_URL}/horario/delete/${idHorario}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      console.log("horario eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el horario');
      }
    }catch (error) {
    throw new Error('Error al eliminar el horario',error);
  }
};
