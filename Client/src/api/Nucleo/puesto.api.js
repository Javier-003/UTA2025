import axios from 'axios';

const BASE_URL = "http://localhost:3000";

export const getPuestos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/puesto`);
    return response.data.data;
  } catch (error) {
    console.error("Error al obtener los puestos:", error);
    throw new Error('Error al obtener el puesto');
  }
};

export const createPuesto = async (id_departamento, nombre) => {
  try {
    await axios.post(`${BASE_URL}/puesto/create`, {
      id_departamento,
      nombre,
    });
  } catch (error) {
    console.error("Error al registrar el puesto:", error);
    throw new Error('Error al registrar el puesto');
  }
};

export const updatePuesto = async (id_puesto, id_departamento, nombre) => {
  try {
    await axios.put(`${BASE_URL}/puesto/update/${id_puesto}`, {
      id_departamento,
      nombre
    });
  } catch (error) {
    console.error("Error al actualizar el puesto:", error);
    throw new Error('Error al actualizar el puesto');
  }
};

export const deletePuesto = async (id_puesto) => {
  try {
    await axios.delete(`${BASE_URL}/puesto/delete/${id_puesto}`);
  } catch (error) {
    console.error("Error al eliminar el puesto:", error);
    throw new Error('Error al eliminar el puesto');
  }
};
