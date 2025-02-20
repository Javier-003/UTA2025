import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')

// Obtener todas las aulas
export const getAulas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/aula`);
    return response.data.data || []; // Retorna los datos de los administrativos
  } catch (error) {
    console.error("Error al obtener las aulas:", error);
    throw new Error('Error al obtener las aulas');
  }
};

// Crear una nueva aula
export const createAula = async (idEdificio, tipo, nombre, sigla) => {
  try {
    const response = await axios.post(`${BASE_URL}/aula/create`, {
      idEdificio, tipo, nombre, sigla, userSession
    });
    console.log("Aula creada:", response.data);
  } catch (error) {
    console.error("Error al registrar el aula:", error);
    throw new Error('Error al registrar el aula');
  }
};

// Actualizar una aula existente
export const updateAula = async (idAula, idEdificio, tipo, nombre, sigla) => {
  try {
    const response = await axios.put(`${BASE_URL}/aula/update/${idAula}`, {
      idEdificio, tipo, nombre, sigla, userSession
    });
    console.log("Aula actualizada:", response.data);
  } catch (error) {
    console.error("Error al actualizar el aula:", error);
    throw new Error('Error al actualizar el aula');
  }
};

// Eliminar una aula
export const deleteAula = async (idAula) => {
  try {
    const response = await axios.delete(`${BASE_URL}/aula/delete/${idAula}`, {
      data: { userSession }  // Aquí usamos 'data' para enviar el cuerpo
    });
    if (response.status === 200) {
      console.log("Aula eliminada correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el aula');
    }
  } catch (error) {
    console.error("Error al eliminar el aula:", error);
    throw new Error('Error al eliminar el aula');
  }
};
