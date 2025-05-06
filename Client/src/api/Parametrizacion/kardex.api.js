import axios from "axios";

const BASE_URL = "http://localhost:3000";
const userSession = localStorage.getItem('Username');

// Obtener todos los registros de kardex
export const getKardex = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/kardex`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los registros de kardex:", error);
    throw new Error('Error al obtener los registros de kardex');
  }
};

// Crear un nuevo registro de kardex
export const createKardex = async (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) => {
  try {
    const response = await axios.post(`${BASE_URL}/kardex/create`, {
      idAlumnoPA: idAlumnoPA || null,
      idMapaCurricular: idMapaCurricular ? idMapaCurricular : null, 
      idGrupo: idGrupo || null,
      idPeriodo: idPeriodo || null,
      calificacionFinal: calificacionFinal || null,
      tipo: tipo || null,
      estatus: estatus || null,
      userSession
    });

    console.log("Respuesta del servidor:", response.data);
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else {
      console.error("Error al registrar el kardex:", error);
    }
    throw new Error('Error al registrar el kardex');
  }
};


// Actualizar un registro de kardex existente
export const updateKardex = async (idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) => {
  try {
    await axios.put(`${BASE_URL}/kardex/update/${idKardex}`, {
      idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus, userSession
    });
  } catch (error) {
    console.error("Error al actualizar el kardex:", error);
    throw new Error('Error al actualizar el kardex');
  }
};

// Eliminar un registro de kardex  
export const deleteKardex = async (idKardex) => {
  try {
    const response = await axios.delete(`${BASE_URL}/kardex/delete/${idKardex}`, { data: { userSession } });
    if (response.status === 200) {
      console.log("Kardex eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el kardex');
    }
  } catch (error) {
    console.error("Error al eliminar el kardex:", error);
    throw new Error('Error al eliminar el kardex');
  }
};

// Actualizar un registro de kardex existente
export const updateTransaccionKardex = async (idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus) => {
  try {
    await axios.put(`${BASE_URL}/kardex/update2/${idKardex}`, {
      idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, estatus, userSession
    });
  } catch (error) {
    console.error("Error al actualizar el kardex:", error);
    throw new Error('Error al actualizar el kardex');
  }
};

// ----------------------- EXTRAORDINARIOS ---------------------------------------------
// Obtener materias por grupo
export const getMateriasByGrupo = async (idGrupo) => {
  try {
    const response = await axios.get(`${BASE_URL}/kardex/materias/${idGrupo}`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener las materias por grupo:", error);
    throw new Error('Error al obtener las materias por grupo');
  }
};

// Crear un nuevo registro de kardex extraordinario
export const createKardexExtraordinario = async (idAlumnoPA, idGrupo, materiasSeleccionadas) => {
  console.log("Kardex creado correctamente:", idAlumnoPA, idGrupo, materiasSeleccionadas);
  try {
    const response = await axios.post(`${BASE_URL}/kardex/createExtraordinario`, {
      idAlumnoPA,
      idGrupo,
      materiasSeleccionadas
    });

    console.log("Respuesta del servidor:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error en la respuesta del servidor:", error.response.data);
    } else {
      console.error("Error al guardar:", error.message);
    }
    throw new Error('Error al registrar el extraordinario');
  }
};
