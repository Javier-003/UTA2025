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
export const createAula = async (IdEdificio, AulaTipo, Nombre, SIGLA) => {
  try {
    await axios.post(`${BASE_URL}/aula/create`, {
      IdEdificio,AulaTipo,Nombre,SIGLA
    });
  } catch (error) {
    console.error("Error al registrar la aula:", error);
    throw new Error('Error al registrar la aula');
  }
};

// Actualizar una aula existente
export const updateAula = async (IdAula, IdEdificio, AulaTipo, Nombre, SIGLA) => {
  try {
    await axios.put(`${BASE_URL}/aula/update/${IdAula}`, {
      IdEdificio,AulaTipo,Nombre,SIGLA
    });
  } catch (error) {
    console.error("Error al actualizar la aula:", error);
    throw new Error('Error al actualizar la aula');
  }
};

// Eliminar una aula
export const deleteAula = async (IdAula) => {
  try {
    await axios.delete(`${BASE_URL}/aula/delete/${IdAula}`);
  } catch (error) {
    console.error("Error al eliminar el aula:", error);
    throw new Error('Error al eliminar el aula');
  }
};
