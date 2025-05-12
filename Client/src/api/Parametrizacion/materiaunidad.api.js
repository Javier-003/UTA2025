import axios from "axios";

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
export const getMateriaU = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/materiaunidad`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error de la API al obtener los registros de la materia unidad:", error);
    throw new Error('Error de la API al obtener los registros de la materia unidad');
  }
};

// Crear una nueva materia unidad 
export const createMateriaU = async (idMapaCurricular, unidad, nombre) => {
  try {
    await axios.post(`${BASE_URL}/materiaunidad/create`, {
       idMapaCurricular, unidad, nombre,userSession
    });
  } catch (error) {
    console.error("Error de la API al registrar la materia unidad:", error);
    throw new Error('Error de la API al registrar la materia unidad');
  }
};

// Actualizar una materia unidad 
export const updateMateriaU = async (idMateriaUnidad, idMapaCurricular, unidad, nombre) => {
  try {
    await axios.put(`${BASE_URL}/materiaunidad/update/${idMateriaUnidad}`, { idMapaCurricular, unidad, nombre,userSession });
  } catch (error) {
    console.error("Error al actualizar la materia unidad:", error);
    throw new Error('Error al actualizar la materia unidad');
  }
};

// Eliminar un registro de materia unidad
export const deleteMateriaU = async (idMateriaUnidad) => {
  try {
    const response = await axios.delete(`${BASE_URL}/materiaunidad/delete/${idMateriaUnidad}`, { data: { userSession } });
    if (response.status === 200) {
      console.log("Materia Unidad eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el materiaunidad');
      }
    }catch (error) {
    console.error("Error al eliminar Materia Unidad:", error);
    throw new Error('Error al eliminar el Materia Unidad');
  }
};
