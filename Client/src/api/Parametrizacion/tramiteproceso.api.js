import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

// Obtener todos los tramite_proceso
export const getTramitesProcesos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tramiteproceso`);
    return response.data.data; // Retorna los datos de los tramite_proceso
  } catch (error) {
    console.error("Error al obtener los tramiteproceso:", error);
    throw new Error('Error al obtener los tramite proceso');
  }
};

// Crear una nuevo tramite_proceso
export const createTramiteProceso = async (idTramite, idActividad, objeto, orden) => {
  console.log("llegando a api", { idTramite, idActividad, objeto, orden });
  try {
    const response = await axios.post(`${BASE_URL}/tramiteproceso/create`, {
      idTramite, idActividad, objeto, orden
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
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
      idTramite, idActividad, objeto, orden
    });
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Trámite Proceso actualizado:", response.data);
  } catch (error) {
    console.error("Error al actualizar el tramite_proceso:", error);
    throw new Error('Error al actualizar el tramite proceso');
  }
};

// Eliminar un tramite_proceso
export const deleteTramiteProceso = async (idTramiteProceso) => {
  try {
    const response = await axios.delete(`${BASE_URL}/tramiteproceso/delete/${idTramiteProceso}`);
    // Usar los valores devueltos en la respuesta para mostrar un mensaje informativo
    console.log("Trámite Proceso eliminado:", response.data);
  } catch (error) {
    console.error("Error al eliminar el tramite proceso:", error);
    throw new Error('Error al eliminar el tramite proceso');
  }
};
