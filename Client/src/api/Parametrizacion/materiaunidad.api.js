import axios from "axios";
const BASE_URL = "http://localhost:3000";

export const getMateriaU = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/materiaunidad`);
      return response.data.data; // Retorna los datos de los registros de kardex
    } catch (error) {
      console.error("Error de la api al obtener los registros de la materia unidad:", error);
      throw new Error('Error de la api al obtener los registros de la materia unidad');
    }
  };
  // Crear una nueva materia unidad 
export const createMateriaU = async (id_mapa_curricular, Unidad, Nombre) => {
    try {
      await axios.post(`${BASE_URL}/materiaunidad/create`, { id_mapa_curricular, Unidad, Nombre  } );
    } catch (error) {
      console.error("Error de la api al registrar la materia unidad:", error);
      throw new Error('Error de la api al registrar la materia unidad');
    }
  };
  
  // Actualizar una materia unidad 
  export const updateMateriaU = async (IdMateriaUnidad, id_mapa_curricular, Unidad, Nombre) => {
    try {
      await axios.put(`${BASE_URL}/materiaunidad/update/${IdMateriaUnidad}`, {id_mapa_curricular, Unidad, Nombre});
    } catch (error) {
      console.error("Error al actualizar la materia unidad:", error);
      throw new Error('Error al actualizar la materia unidad');
    }
  };
  
  // Eliminar una materia unidad
  export const deleteMateriaU  = async (IdMateriaUnidad) => {
    try {
      await axios.delete(`${BASE_URL}/materiaunidad/delete/${IdMateriaUnidad}`);
    } catch (error) {
      console.error("Error al eliminar la materia unidad:", error);
      throw new Error('Error al eliminar la materia unidad');
    }
  };
  