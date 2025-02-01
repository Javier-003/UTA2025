import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas las aulas
export const getAulas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/aula`);
    return response.data.data; // Retorna los datos de las aulas
  } catch (error) {
    console.error("Error al obtener las aulas:", error);
    throw new Error('Error al obtener las aulas');
  }
};

// Crear una nueva aula
export const createAula = async (idEdificio, tipo, nombre, sigla) => {
  try {
    await axios.post(`${BASE_URL}/aula/create`, {
      idEdificio, tipo, nombre, sigla
    });
  } catch (error) {
    console.error("Error al registrar el aula:", error);
    throw new Error('Error al registrar el aula');
  }
};

// Actualizar una aula existente
export const updateAula = async (idAula, idEdificio, tipo, nombre, sigla) => {
  try {
    await axios.put(`${BASE_URL}/aula/update/${idAula}`, {
      idEdificio, tipo, nombre, sigla
    });
  } catch (error) {
    console.error("Error al actualizar el aula:", error);
    throw new Error('Error al actualizar el aula');
  }
};


// Eliminar un aula
export const deleteAula = async (idAula) => {
  try {
    await axios.delete(`${BASE_URL}/aula/delete/${idAula}`);
  } catch (error) {
    console.error("Error al eliminar el puesto:", error);
    throw new Error('Error al eliminar el puesto');
  }
};
