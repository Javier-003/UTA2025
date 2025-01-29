import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos la carga de materias 
export const getCargaMaterias = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/cargamaterias`);
      return response.data.data; // Retorna los datos de la carga de materias
    } catch (error) {
      console.error("Error al obtener la carga de materias:", error);
      throw new Error('Error al obtener la carga de materias');
    }
  };
  
  // Crear una nuevo carga de materias
  export const createCargaMaterias = async (id_grupo, idMapaCurricular, tipo, fecha, idProfesor) => {
    try {
      await axios.post(`${BASE_URL}/cargamaterias/create`, {id_grupo, idMapaCurricular, tipo, fecha, idProfesor});
    } catch (error) {
      console.error("Error al registrar la carga de materias:", error);
      throw new Error('Error al registrar la carga de materias');
    }
  };
  
  // Actualizar una carga de materias 
  export const updateCargaMaterias = async (id_grupo_materia, id_grupo, idMapaCurricular, tipo, idProfesor) => {
    try {
      await axios.put(`${BASE_URL}/cargamaterias/update/${id_grupo_materia}`, id_grupo, idMapaCurricular, tipo, idProfesor);
    } catch (error) {
      console.error("Error al actualizar la api de carga materias:", error);
      throw new Error('Error al actualizar la api de carga materias');
    }
  };
  
  // Eliminar una carga de materias
  export const deleteCargaMaterias = async (id_grupo_materia) => {
    try {
      await axios.delete(`${BASE_URL}/cargamaterias/delete/${id_grupo_materia}`);
    } catch (error) {
      console.error("Error al eliminar la carga de materias:", error);
      throw new Error('Error al eliminar la carga de materias');
    }
  };
  