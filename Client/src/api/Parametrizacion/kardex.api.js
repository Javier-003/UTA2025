import axios from "axios";
const BASE_URL = "http://localhost:3000";

export const getKardex = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/kardex`);
      return response.data.data; // Retorna los datos de los registros de kardex
    } catch (error) {
      console.error("Error de la api al obtener los registros del kardex:", error);
      throw new Error('Error de la api al obtener los registros del kardex');
    }
  };
  
// Crear un nuevo registro 
    export const createKardex = async (idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo) => {
      console.log("Datos que llegan a createKardex:", { idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo });
      if (!idAlumnoPrograma || !id_mapa_curricular || !idGrupo || !id_periodo || !CalificacionFinal || !Tipo) {
      throw new Error("Todos los campos son obligatorios para crear un kardex.");
      
    } 

    try {
      await axios.post(`${BASE_URL}/kardex/create`, {
        idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo
      });
    } catch (error) {
      console.error("Error de la API al registrar el kardex:", error);
      throw new Error('Error de la API al registrar el kardex');
    }
};
  // Actualizar un registro 
export const updateKardex = async (IdKardex, idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo) => { 
  try {
      await axios.put(`${BASE_URL}/kardex/update/${IdKardex}`, 
        idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo
      );
    } catch (error) {
      console.error("Error de la api al actualizar el kardex:", error);
      throw new Error('Error de la api al actualizar el kardex');
    }
  };

  // Eliminar un registro de alumno_programa
export const deleteKardex = async (IdKardex) => {
    try {
      await axios.delete(`${BASE_URL}/kardex/delete/${IdKardex}`);
    } catch (error) {
      console.error("Error de la api al eliminar el kardex:", error);
      throw new Error('Error de la api al eliminar el kardex:');
    }
  };
  