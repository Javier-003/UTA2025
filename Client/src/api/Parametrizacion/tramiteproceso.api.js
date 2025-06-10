import axios from 'axios';

// URL base de la API
import { BASE_URL } from '../config'; 
const userSession = localStorage.getItem('Username')
axios.defaults.withCredentials = true;
// Obtener todos los tramite_proceso
export const getTramitesProcesos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tramiteproceso`);
    return response.data.data || []; 
  } catch (error) {
    console.error("Error al obtener los tramiteproceso:", error);
    throw new Error('Error al obtener los tramite proceso');
  }
};

// Crear una nuevo Tramite Proceso
export const createTramiteProceso = async (idTramite, idActividad, objeto, orden) => {
  try {
    const response = await axios.post(`${BASE_URL}/tramiteproceso/create`, {
      idTramite, idActividad, objeto, orden, userSession
    });
    console.log("Trámite Proceso creado:", response.data);
  } catch (error) {
    console.error("Error al registrar el tramite proceso:", error);
    throw new Error('Error al registrar el tramite proceso');
  }
};

// Actualizar un tramite_proceso existente
export const updateTramiteProceso = async (idTramiteProceso, idTramite, idActividad, objeto, orden) => {
  try {
    const response = await axios.put(`${BASE_URL}/tramiteproceso/update/${idTramiteProceso}`, {
      idTramite, idActividad, objeto, orden, userSession
    });
    console.log("Trámite Proceso actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el tramite_proceso:", error);
    throw new Error('Error al actualizar el tramite proceso');
  }
};

// Eliminar un registro de Tramite Proceso
export const deleteTramiteProceso = async (idTramiteProceso) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tramiteproceso/delete/${idTramiteProceso}`, { data: { userSession } });
    if (response.status === 200) {
      console.log("Tramite Proceso eliminado correctamente:", response.data);
      return response.data; 
    } else {
      throw new Error('No se pudo eliminar el Tramite Proceso');
      }
    }catch (error) {
    console.error("Error al eliminar Tramite Proceso:", error);
    throw new Error('Error al eliminar el Tramite Proceso');
  }
};
