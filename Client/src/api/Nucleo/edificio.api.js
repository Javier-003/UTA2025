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
export const createEdificio = async (Nombre, Sigla) => {
  try {
    await axios.post(`${BASE_URL}/edificio/create`, { Nombre: Nombre , Sigla: Sigla  } );
  } catch (error) {
    console.error("Error al registrar la edificio:", error);
    throw new Error('Error al registrar la edificio');
  }
};

// Actualizar una edificio existente
export const updateEdificio = async (id_edificio, Nombre, Sigla) => {
  try {
    await axios.put(`${BASE_URL}/edificio/update/${id_edificio}`, { Nombre: Nombre, Sigla: Sigla}  );
  } catch (error) {
    console.error("Error al actualizar el edificio:", error);
    throw new Error('Error al actualizar el edificio');
  }
};

// Eliminar una edificio
export const deleteEdificio = async (id_edificio) => {
  try {
    await axios.delete(`${BASE_URL}/edificio/delete/${id_edificio}`);
  } catch (error) {
    console.error("Error al eliminar el edificio:", error);
    throw new Error('Error al eliminar el edificio');
  }
};
