import axios from "axios";

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Función para obtener todos los horarios
export const getHorario = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/horario`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener horarios:", error.response?.data || error.message);
    return [];
  }
}

// Función para crear un horario
export const createHorario = async (horario) => {
  try {
    const response = await axios.post(`${BASE_URL}/horario/create`, horario);
    return response.data;
  } catch (error) {
    console.error("Error al crear horario:", error.response?.data || error.message);
    return { error: "No se pudo crear el horario." };
  }
};

// Función para actualizar un horario
export const updateHorario = async (idHorario, horario) => {
  try {
    const response = await axios.put(`${BASE_URL}/horario/update/${idHorario}`, horario);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar horario:", error.response?.data || error.message);
    return { error: "No se pudo actualizar el horario." };
  }
};

// Función para eliminar un horario
export const deleteHorario = async (idHorario) => {
  try {
    const response = await axios.delete(`${BASE_URL}/horario/delete/${idHorario}`);
    return response.data;
  } catch (error) {
    console.error("Error al eliminar horario:", error.response?.data || error.message);
    return { error: "No se pudo eliminar el horario." };
  }
};
