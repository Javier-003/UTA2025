import axios from "axios";

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todas las ofertas academicas
export const getOfertaAcademica = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/ofertaacademica`);
    return response.data.data || [];  // Retorna los datos de las ofertas academicas
  } catch (error) {
    console.error("Error al obtener las ofertas academicas:", error.response?.data || error.message);
    throw new Error('Error al obtener las ofertas academicas');
  }
};

// Crear una nueva oferta academica
export const createOfertaAcademica = async (nombre, descripcion, sigla, desde, hasta) => {
  try {
    await axios.post(`${BASE_URL}/ofertaacademica/create`, { nombre, descripcion, sigla, desde, hasta  ,  userSession});
  } catch (error) {
    console.error("Error al registrar la oferta academica:", error.response?.data || error.message);
    throw new Error('Error al registrar la oferta academica');
  }
};

// Actualizar una oferta academica existente
export const updateOfertaAcademica = async (idOfertaAcademica, nombre, descripcion, sigla, desde, hasta) => {
  try {
    await axios.put(`${BASE_URL}/ofertaacademica/update/${idOfertaAcademica}`, { nombre, descripcion, sigla, desde, hasta , userSession });
  } catch (error) {
    console.error("Error al actualizar la oferta academica:", error.response?.data || error.message);
    throw new Error('Error al actualizar la oferta academica');
  }
};

// Eliminar una oferta academica
export const deleteOfertaAcademica = async (idOfertaAcademica) => {
  try {
    const response = await axios.delete(`${BASE_URL}/ofertaacademica/delete/${idOfertaAcademica}`, {
      data: { userSession } 
    });
    if (response.status === 200) {
      console.log("Oferta Academica eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar la oferta academica');
      }
    }catch (error) {
    throw new Error('Error al eliminar la oferta academica',error);
  }
};
