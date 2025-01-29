import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas las programa academicos
export const getProgramaacademicos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/programaacademico`);
    return response.data.data; // Retorna los datos de las aulas
  } catch (error) {
    console.error("Error al obtener los programa academicos:", error);
    throw new Error('Error al obtener los programa academicos');
  }
};

// Crear un programa academico
export const createProgramaAcademico = async (id_nivel_estudio, Titulo_Tsu, 
    Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus) => {
    try {
      await axios.post(`${BASE_URL}/programaacademico/create`, {id_nivel_estudio, Titulo_Tsu, 
        Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus
      });
    } catch (error) {
      console.error("Error al registrar los programa academicos:", error);
      throw new Error('Error al registrar los programa academicos');
    }
};


// Actualizar un programa academico
export const updateProgramaAcademico = async (id_programa_academico, id_nivel_estudio, Titulo_Tsu, 
    Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus) => {
    try {
      await axios.put(`${BASE_URL}/programaacademico/update/${id_programa_academico}`, {
        id_nivel_estudio, Titulo_Tsu, 
    Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus
      });
    } catch (error) {
      console.error("Error al actualizar los programa academicos:", error);
      throw new Error('Error al actualizar los programa academicos');
    }
};

// Eliminar un programa academico
export const deleteProgramaAcademico = async (id_programa_academico) => {
    try {
      await axios.delete(`${BASE_URL}/programaacademico/delete/${id_programa_academico}`);
    } catch (error) {
      console.error("Error al eliminar el programa academico:", error);
      throw new Error('Error al eliminar el programa academico');
    }
};
