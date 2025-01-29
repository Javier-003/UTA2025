import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los admistrativo
export const getAdministrativos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/administrativo`);
    return response.data.data; // Retorna los datos de los administrativo
  } catch (error) {
    console.error("Error al obtener los administrativo:", error);
    throw new Error('Error al obtener los administrativo');
  }
};

// Crear una nueva0 administrativo
export const createAdministrativo = async (id_departamento,id_puesto,clave,horario,nss,rfc ) => {
  try {
    const response = await axios.post(`${BASE_URL}/administrativo/create`, {
        id_departamento,id_puesto,clave,horario,nss,rfc 
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("administrativo creado:", response.data);
  } catch (error) {
    console.error("Error al registrar el administrativo:", error);
    throw new Error('Error al registrar el administrativo');
  }
};

// Actualizar un administrativo  existente
export const updateAdministrativo = async (id_administrativo , 
    id_departamento,id_puesto,clave,horario,nss,rfc  ) => {
  try {
    const response = await axios.put(`${BASE_URL}/administrativo/update/${id_administrativo}`, {
        id_departamento,id_puesto,clave,horario,nss,rfc 
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Administrativo actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el Administrativo :", error);
    throw new Error('Error al actualizar el Administrativo  proceso');
  }
};

// Eliminar un administrativo
export const deleteAdministrativo = async (id_administrativo) => {
  try {
    const response = await axios.delete(`${BASE_URL}/administrativo/delete/${id_administrativo}`);
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Administrativo eliminado:", response.data);
  } catch (error) {
    console.error("Error al eliminar el administrativo :", error);
    throw new Error('Error al eliminar el administrativo.');
  }
};
