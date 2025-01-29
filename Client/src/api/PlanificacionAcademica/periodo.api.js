import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas los periodos
export const getPeriodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/periodo`);
    return response.data.data; // Retorna los datos de los periodos
  } catch (error) {
    console.error("Error al obtener los periodos:", error.response?.data || error.message);
    throw new Error('Error al obtener los periodos');
  }
};

// Crear un nuevo periodo
export const createPeriodo = async (periodo, fecha_inicio, fecha_fin, estado, fecha_registro) => {
  try {
    await axios.post(`${BASE_URL}/periodo/create`, { periodo, fecha_inicio, fecha_fin, estado, fecha_registro });
  } catch (error) {
    console.error("Error al registrar el periodo:", error.response?.data || error.message);
    throw new Error('Error al registrar el periodo');
  }
};

// Actualizar un periodo existente
export const updatePeriodo = async (id_periodo, periodo, fecha_inicio, fecha_fin, estado) => {
  try {
    await axios.put(`${BASE_URL}/periodo/update/${id_periodo}`, { periodo, fecha_inicio, fecha_fin, estado });
  } catch (error) {
    console.error("Error al actualizar el periodo:", error.response?.data || error.message);
    throw new Error('Error al actualizar el periodo');
  }
};

// Eliminar un periodo
export const deletePeriodo = async (id_periodo) => {
  try {
    await axios.delete(`${BASE_URL}/periodo/delete/${id_periodo}`);
  } catch (error) {
    console.error("Error al eliminar el periodo:", error.response?.data || error.message);
    throw new Error('Error al eliminar el periodo');
  }
};
