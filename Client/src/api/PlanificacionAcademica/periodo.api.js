import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')

// Obtener todas los periodos
export const getPeriodos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/periodo`);
    return response.data.data || [];  // Retorna los datos de los periodos
  } catch (error) {
    console.error("Error al obtener los periodos:", error.response?.data || error.message);
    throw new Error('Error al obtener los periodos');
  }
};

// Crear un nuevo periodo
export const createPeriodo = async (periodo, fechaInicio, fechaFin, estado, fechaRegistro) => {
  console.log("llegando a api", { periodo, fechaInicio, fechaFin, estado, fechaRegistro });
  try {
    await axios.post(`${BASE_URL}/periodo/create`, { periodo, fechaInicio, fechaFin, estado, fechaRegistro , userSession});
  } catch (error) {
    console.error("Error al registrar el periodo:", error.response?.data || error.message);
    throw new Error('Error al registrar el periodo');
  }
};

// Actualizar un periodo existente
export const updatePeriodo = async (idPeriodo, periodo, fechaInicio, fechaFin, estado) => {
  try {
    await axios.put(`${BASE_URL}/periodo/update/${idPeriodo}`, { periodo, fechaInicio, fechaFin, estado , userSession});
  } catch (error) {
    console.error("Error al actualizar el periodo:", error.response?.data || error.message);
    throw new Error('Error al actualizar el periodo');
  }
};

// Eliminar un periodo
export const deletePeriodo = async (idPeriodo) => {
  try {
    const response = await axios.delete(`${BASE_URL}/periodo/delete/${idPeriodo}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      console.log("Periodo eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el periodo');
      }
    }catch (error) {
    throw new Error('Error al eliminar el periodo',error);
  }
};
