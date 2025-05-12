import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;

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
    await axios.post(`${BASE_URL}/edificio/create`, 
      { nombre: nombre , sigla: sigla,userSession  } );
  } catch (error) {
    console.error("Error al registrar la edificio:", error);
    throw new Error('Error al registrar la edificio');
  }
};

// Actualizar una edificio existente
export const updateEdificio = async (idEdificio, nombre, sigla) => {
  try {
    await axios.put(`${BASE_URL}/edificio/update/${idEdificio}`, 
      { nombre: nombre, sigla: sigla,userSession}  );
  } catch (error) {
    console.error("Error al actualizar el edificio:", error);
    throw new Error('Error al actualizar el edificio');
  }
};

// Eliminar un edificio
export const deleteEdificio = async (idEdificio) => {
  try {
    const response = await axios.delete(`${BASE_URL}/edificio/delete/${idEdificio}`, {
      data: { userSession }  // Aquí usamos 'data' para enviar el cuerpo
    });
    if (response.status === 200) {
      console.log("Edificio eliminado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el edificio');
    }
  } catch (error) {
    console.error("Error al eliminar el edificio:", error);
    throw new Error('Error al eliminar el edificio');
  }
};


