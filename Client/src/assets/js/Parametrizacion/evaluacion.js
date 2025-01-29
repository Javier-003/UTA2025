import Swal from 'sweetalert2';
import {getEvaluacion, createEvaluacion, updateEvaluacion, deleteEvaluacion} 
from '../../../api/Parametrizacion/evaluacion.api.js';

// ----------------------------- Obtener todos los registros -----------------------------
export const getEvaluacionjs = async (setEvaluacionjs) => {
  try {
    const data = await getEvaluacion();
    setEvaluacionjs(data);
  } catch (error) {
    console.error('Error al obtener los registros del evaluacion en js:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema obteniendo los registros de la evaluación.',
    });
  }
};

// ----------------------------- Crear un nuevo registro -----------------------------
export const addEvaluacion = async (IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad, setShowModal, getEvaluacionjs) => {
  if (!IdKardex || !id_mapa_curricular || !Faltas || !Calificacion || !Estatus || !Nombre || !IdMateriaUnidad) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Todos los campos son obligatorios para registrar una evaluación.',
    });
  }
   
  try {
    await createEvaluacion(IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad);
    getEvaluacionjs();
      Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'evaluación registrada correctamente',
    }); getEvaluacionjs();
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el registro de la evaluación:', error);
    // Manejo robusto de error
    if (error.response) {
      // Si la API responde con un error, muestra el mensaje de la respuesta
      console.log('Respuesta del servidor:', error.response);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message || 'Hubo un problema registrando la evaluación.',
      });
    } else if (error.request) {
      // Si no hay respuesta del servidor
      console.log('No se recibió respuesta del servidor:', error.request);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se recibió respuesta del servidor. Por favor, revisa tu conexión o la configuración de la API.',
      });
    } else {
      // Si ocurrió un error al configurar la solicitud
      console.log('Error al configurar la solicitud:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al configurar la solicitud.',
      });
    }
  }}

// ----------------------------- Actualizar un registro -----------------------------
export const updateEvaluacionjs = async (IdEvaluacion, IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad, setShowEditModal, getEvaluacionjs) => {
  if (!IdEvaluacion || !IdKardex || !id_mapa_curricular || !Faltas || !Calificacion || !Estatus || !Nombre || !IdMateriaUnidad) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Todos los campos son obligatorios para actualizar una evaluación.',
    });
  }
  try {
    await updateEvaluacion(IdEvaluacion, IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad);
    getEvaluacionjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La evaluación fue actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar la evaluación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema actualizando la evaluación.',
    });
  }
};

// ----------------------------- Eliminar un registro -----------------------------
export const deleteEvaluacionjs = async (IdEvaluacion, setShowDeleteModal, getEvaluacionjs) => {
  if (!IdEvaluacion) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'El ID de la evaluación es obligatorio para eliminarlo.',
    });
  }
  try {
    await deleteEvaluacion(IdEvaluacion);
    getEvaluacionjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'La evaluación fue eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar la evaluación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema eliminando la evaluación.',
    });
  }
};
