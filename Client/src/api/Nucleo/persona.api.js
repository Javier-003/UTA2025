import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los persona
export const getPersonas = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/persona`);
    return response.data.data; // Retorna los datos de los persona
  } catch (error) {
    console.error("Error al obtener los personas:", error);
    throw new Error('Error al obtener los personas');
  }
};

// Crear una nueva persona
export const createPersona = async (nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento) => {
  try {
    await axios.post(`${BASE_URL}/persona/create`, {
      nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento
    });
  } catch (error) {
    console.error("Error al registrar la persona:", error);
    throw new Error('Error al registrar la persona');
  }
};

// Actualizar una persona existente
export const updatePersona = async (id_persona, nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento) => {
  try {
    await axios.put(`${BASE_URL}/persona/update/${id_persona}`, {
      nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento
    });
  } catch (error) {
    console.error("Error al actualizar el persona:", error);
    throw new Error('Error al actualizar el persona');
  }
};

// Eliminar una persona
export const deletePersona = async (id_persona) => {
    try {
      await axios.delete(`${BASE_URL}/persona/delete/${id_persona}`);
    } catch (error) {
      console.error("Error al eliminar el persona:", error);
      throw new Error('Error al eliminar el persona');
    }
};  
