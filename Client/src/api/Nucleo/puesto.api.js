import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;

// Obtener todos los puestos
export const getPuestos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/puesto`);
    return response.data.data || []; // Retorna los datos de los usuarios
  } catch (error) {
    console.error("Error al obtener los puestos:", error);
    throw new Error('Error al obtener los puestos');
  }
};

// Crear un nuevo puesto
export const createPuesto = async (idDepartamento, nombre) => {
  try {
    const response = await axios.post(`${BASE_URL}/puesto/create`, {
      idDepartamento, nombre, userSession
    });
    console.log("Puesto creado:", response.data);
  } catch (error) {
    console.error("Error al registrar el puesto:", error);
    throw new Error('Error al registrar el puesto');
  }
};

// Actualizar un puesto existente
export const updatePuesto = async (idPuesto, idDepartamento, nombre) => {
  try {
    const response = await axios.put(`${BASE_URL}/puesto/update/${idPuesto}`, {
      idDepartamento, nombre, userSession
    });
    console.log("Puesto actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el puesto:", error);
    throw new Error('Error al actualizar el puesto');
  }
};

// Eliminar un puesto
export const deletePuesto = async (idPuesto) => {
  try {
    const response = await axios.delete(`${BASE_URL}/puesto/delete/${idPuesto}`, {
      data: { userSession }  // Aquí usamos 'data' para enviar el cuerpo
    });
    if (response.status === 200) {
      console.log("Puesto eliminado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el puesto');
    }
  } catch (error) {
    console.error("Error al eliminar el puesto:", error);
    throw new Error('Error al eliminar el puesto');
  }
};
