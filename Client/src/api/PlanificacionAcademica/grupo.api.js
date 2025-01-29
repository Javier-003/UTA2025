import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los grupos
export const getGrupos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/grupo`);
    return response.data.data; // Retorna los datos de los grupos
  } catch (error) {
    console.error("Error al obtener los grupos:", error);
    throw new Error('Error al obtener los grupos');
  }
};

// Crear un nuevo grupo
export const createGrupo = async (idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha) => {
  try {
    await axios.post(`${BASE_URL}/grupo/create`, { 
      idPeriodo,idProgramaAcademico,idTutor,nombre,cuatrimestre,observacion,estatus,fecha
    });
  } catch (error) {
    console.error("Error al registrar el grupo:", error);
    throw new Error('Error al registrar el grupo');
  }
};

// Actualizar un grupo existente
export const updateGrupo = async (idGrupo, idPeriodo, idProgramaAcademico, idTutor, nombre, cuatrimestre, observacion, estatus, fecha) => {
  try {
    await axios.put(`${BASE_URL}/grupo/update/${idGrupo}`, { 
      idPeriodo,idProgramaAcademico,idTutor,nombre,cuatrimestre,observacion,estatus,fecha
    });
  } catch (error) {
    console.error("Error al actualizar el grupo:", error);
    throw new Error('Error al actualizar el grupo');
  }
};

// Eliminar un grupo
export const deleteGrupo = async (idGrupo) => {
  try {
    await axios.delete(`${BASE_URL}/grupo/delete/${idGrupo}`);
  } catch (error) {
    console.error("Error al eliminar el grupo:", error);
    throw new Error('Error al eliminar el grupo');
  }
};
