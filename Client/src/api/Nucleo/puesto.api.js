import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los puestos
export const getPuestos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/puesto`);
    return response.data.data; // Retorna los datos de los puestos
  } catch (error) {
    console.error("Error al obtener los puestos:", error);
    throw new Error('Error al obtener los puestos');
  }
};

// Crear un nuevo puesto
export const createPuesto = async (idDepartamento, nombre) => {
  try {
    await axios.post(`${BASE_URL}/puesto/create`, {
      idDepartamento, nombre
    });
  } catch (error) {
    console.error("Error al registrar el puesto:", error);
    throw new Error('Error al registrar el puesto');
  }
};

// Actualizar un puesto existente
export const updatePuesto = async (idPuesto, idDepartamento, nombre) => {
  try {
    await axios.put(`${BASE_URL}/puesto/update/${idPuesto}`, {
      idDepartamento, nombre
    });
  } catch (error) {
    console.error("Error al actualizar el puesto:", error);
    throw new Error('Error al actualizar el puesto');
  }
};

// Eliminar un puesto
export const deletePuesto = async (idPuesto) => {
  try {
    await axios.delete(`${BASE_URL}/puesto/delete/${idPuesto}`);
  } catch (error) {
    console.error("Error al eliminar el puesto:", error);
    throw new Error('Error al eliminar el puesto');
  }
};
