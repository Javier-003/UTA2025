import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todas las personas
export const getPersonas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/persona`);
    return response.data.data; // Retorna los datos de las personas
  } catch (error) {
    console.error("Error al obtener las personas:", error);
    throw new Error('Error al obtener las personas');
  }
};

// Crear una nueva persona
export const createPersona = async (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono) => {
  try {
    await axios.post(`${BASE_URL}/persona/create`, {
      nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono
    });
  } catch (error) {
    console.error("Error al registrar la persona:", error);
    throw new Error('Error al registrar la persona');
  }
};

// Actualizar una persona existente
export const updatePersona = async (idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono) => {
  try {
    await axios.put(`${BASE_URL}/persona/update/${idPersona}`, {
      nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono
    });
  } catch (error) {
    console.error("Error al actualizar la persona:", error);
    throw new Error('Error al actualizar la persona');
  }
};

// Eliminar una persona
export const deletePersona = async (idPersona) => {
  try {
    await axios.delete(`${BASE_URL}/persona/delete/${idPersona}`);
  } catch (error) {
    console.error("Error al eliminar la persona:", error);
    throw new Error('Error al eliminar la persona');
  }
};
