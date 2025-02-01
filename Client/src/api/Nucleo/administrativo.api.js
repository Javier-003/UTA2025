import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los administrativos
export const getAdministrativos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/administrativo`);
    return response.data.data; // Retorna los datos de los administrativos
  } catch (error) {
    console.error("Error al obtener los administrativos:", error);
    throw new Error('Error al obtener los administrativos');
  }
};

// Crear un nuevo administrativo
export const createAdministrativo = async (idPersona,idDepartamento, idPuesto, clave, horario, nss, rfc) => {
  try {
    const response = await axios.post(`${BASE_URL}/administrativo/create`, {
      idPersona,idDepartamento, idPuesto, clave, horario, nss, rfc
    });
    console.log("Administrativo creado:", response.data);
  } catch (error) {
    console.error("Error al registrar el administrativo:", error);
    throw new Error('Error al registrar el administrativo');
  }
};

// Actualizar un administrativo existente
export const updateAdministrativo = async (idAdministrativo,idPersona, idDepartamento, idPuesto, clave, horario, nss, rfc) => {
  try {
    const response = await axios.put(`${BASE_URL}/administrativo/update/${idAdministrativo}`, {
      idDepartamento,idPersona, idPuesto, clave, horario, nss, rfc
    });
    console.log("Administrativo actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el administrativo:", error);
    throw new Error('Error al actualizar el administrativo');
  }
};

// Eliminar un administrativo
export const deleteAdministrativo = async (idAdministrativo) => {
  try {
    await axios.delete(`${BASE_URL}/administrativo/delete/${idAdministrativo}`);
  } catch (error) {
    console.error("Error al eliminar el administrativo:", error);
    throw new Error('Error al eliminar el administrativo');
  }
};
