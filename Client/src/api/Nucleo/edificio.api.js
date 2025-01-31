import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los edificios
export const getEdificios = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/edificio`);
    return response.data.data; // Retorna los datos de los edificios
  } catch (error) {
    console.error("Error al obtener los edificios:", error);
    throw new Error('Error al obtener los edificios');
  }
};


// Crear una nuevo edificio
export const createEdificio = async (nombre, sigla) => {
  try {
    await axios.post(`${BASE_URL}/edificio/create`, { nombre: nombre , sigla: sigla  } );
  } catch (error) {
    console.error("Error al registrar la edificio:", error);
    throw new Error('Error al registrar la edificio');
  }
};

// Actualizar una edificio existente
export const updateEdificio = async (idEdificio, nombre, sigla) => {
  try {
    await axios.put(`${BASE_URL}/edificio/update/${idEdificio}`, { nombre: nombre, sigla: sigla}  );
  } catch (error) {
    console.error("Error al actualizar el edificio:", error);
    throw new Error('Error al actualizar el edificio');
  }
};

// Eliminar una edificio
export const deleteEdificio = async (idEdificio) => {
  try {
    await axios.delete(`${BASE_URL}/edificio/delete/${idEdificio}`);
  } catch (error) {
    console.error("Error al eliminar el edificio:", error);
    throw new Error('Error al eliminar el edificio');
  }
};
