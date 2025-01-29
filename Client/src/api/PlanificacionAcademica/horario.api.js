import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los edificios
export const getHorario = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/horario`);
    return response.data.data; // Retorna los datos de los horarios
  } catch (error) {
    console.error("Error al obtener los horarios:", error);
    throw new Error('Error al obtener los horarios');
  }
};

//Crear Horario
export const createHorario = async (idGrupoMateria, id_Bloque, dia) => {
  try {
    await axios.post(`${BASE_URL}/horario/create`, { idGrupoMateria: idGrupoMateria , id_Bloque: id_Bloque, dia: dia  } );
  } catch (error) {
    console.error("Error al registrar el horario:", error);
    throw new Error('Error al registrar el horario');
  }
};

// Actualizar un horario existente
export const updateHorario = async (idHorario, idGrupoMateria, id_Bloque, dia) => {
  try {
    await axios.put(`${BASE_URL}/horario/update/${idHorario}`, { idGrupoMateria: idGrupoMateria, id_Bloque: id_Bloque, dia: dia}  );
  } catch (error) {
    console.error("Error al actualizar el horario:", error);
    throw new Error('Error al actualizar el horario');
  }
};

// Eliminar un horario
export const deleteHorario = async (idHorario) => {
  try {
    await axios.delete(`${BASE_URL}/horario/delete/${idHorario}`);
  } catch (error) {
    console.error("Error al eliminar el horario:", error);
    throw new Error('Error al eliminar el horario');
  }
};