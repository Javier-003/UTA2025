import axios from "axios";
const BASE_URL = "http://localhost:3000";

export const getEvaluacion = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/evaluacion`);
      return response.data.data; // Retorna los datos de los registros
    } catch (error) {
      console.error("Error de la api al obtener los registros de la evaluación:", error);
      throw new Error('Error de la api al obtener los registros de la evaluación');
    }
  };
  // Crear una nueva evaluacion
export const createEvaluacion = async (IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad) => {
    try {
      await axios.post(`${BASE_URL}/evaluacion/create`, {IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad} );
    } catch (error) {
      console.error("Error de la api al registrar la evaluacion:", error);
      throw new Error('Error de la pia al registrar la evaluacion');
    }
  };
  
  // Actualizar una evaluacion
  export const updateEvaluacion = async (IdEvaluacion, IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad) => {
    try {
      await axios.put(`${BASE_URL}/evaluacion/update/${IdEvaluacion}`, {IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad});
    } catch (error) {
      console.error("Error al actualizar la evaluacion:", error);
      throw new Error('Error al actualizar la evaluacion');
    }
  };
  
  // Eliminar una evaluacion
  export const deleteEvaluacion  = async (IdEvaluacion) => {
    try {
      await axios.delete(`${BASE_URL}/evaluacion/delete/${IdEvaluacion}`);
    } catch (error) {
      console.error("Error al eliminar la evaluacion:", error);
      throw new Error('Error al eliminar la evaluacion');
    }
  };
  