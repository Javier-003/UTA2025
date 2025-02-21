import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username')

// Obtener todos los programas académicos
export const getProgramaacademicos = async () => {
  try {      
    const response = await axios.get(`${BASE_URL}/programaacademico`);
    return response.data.data || []; 
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else {
      console.error("Error al obtener los programas académicos:", error.message);
    }
    return null;
  }
};

// Crear un programa académico
export const createProgramaAcademico = async (idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus) => {
  console.log("Enviando datos a la API:", { idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus, userSession });

  try {
    await axios.post(`${BASE_URL}/programaacademico/create`, {
      idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio,
      totalPeriodos, totalCreditos, desde, hasta, estatus
    });
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else {
      console.error("Error al registrar el programa académico:", error.message);
    }
    throw new Error('Error al registrar el programa académico');
  }
};

// Actualizar un programa académico
export const updateProgramaAcademico = async (idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus) => {
  console.log("Enviando datos actualizar a la API:", { idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus,  });

  try {
    await axios.put(`${BASE_URL}/programaacademico/update/${idProgramaAcademico}`, {
      idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio,
      totalPeriodos, totalCreditos, desde, hasta, estatus
    });
  } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else {
      console.error("Error al actualizar el programa académico:", error.message);
    }
    throw new Error('Error al actualizar el programa académico');
  }
};

// Eliminar un programa académico
export const deleteProgramaAcademico = async (idProgramaAcademico) => {
  try {
    const response = await axios.delete(`${BASE_URL}/programaacademico/delete/${idProgramaAcademico}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      console.log("Programa Academico eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el Programa Academico');
      }
    }catch (error) {
    throw new Error('Error al eliminar el Programa Academico',error);
  }
};
