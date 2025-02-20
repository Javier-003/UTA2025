import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener las cargas de materias
export const getCargaMaterias = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/cargamaterias`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las cargas de materias:', error);
    throw error;
  }
};

// Crear una carga de materias
export const createCargaMaterias = async (idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios) => {
  //console.log('Datos recibidos en el backend:', idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
  try {
    const response = await axios.post(`${BASE_URL}/cargamaterias/create`, { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios });
    return response.data;
  } catch (error) {
    console.error('Error al crear la carga de materias:', error);
    throw error;
  }
};

// Actualizar una carga de materias
export const updateCargaMaterias = async (idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios) => {
  console.log('Datos recibidos en el backend:', idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
  try {
    const response = await axios.put(`${BASE_URL}/cargamaterias/update/${idGrupoMateria}`, { idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la carga de materias:', error);
    throw error;
  }
};

// Eliminar una carga de materias
export const deleteCargaMaterias = async (idGrupoMateria) => {
  try {
    const response = await axios.delete(`${BASE_URL}/cargamaterias/delete/${idGrupoMateria}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar la carga de materias:', error);
    throw error;
  }
};
