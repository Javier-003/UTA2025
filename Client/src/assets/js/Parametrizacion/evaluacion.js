import Swal from 'sweetalert2';

import { getEvaluacion, createEvaluacion, updateEvaluacion, deleteEvaluacion } 
from '../../../api/Parametrizacion/evaluacion.api.js';

// Obtener todos los registros de Evaluacion
export const getEvaluacionTodos = async (setEvaluacion) => {
  try {
    const data = await getEvaluacion();
    setEvaluacion(data);
  } catch (error) {
    console.error('Error al obtener los registros de evaluación:', error);
  }
};

// Crear un nuevo registro de Evaluacion
export const addEvaluacion = async (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus, setShowModal, getEvaluacionTodos) => {
  try {
    await createEvaluacion(idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus);
    getEvaluacionTodos();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Evaluación registrada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el registro de evaluación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el registro de evaluación.',
    });
  }
};

// Actualizar un registro de Evaluacion existente
export const updateEvaluacionFunc = async (idEvaluacion, idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus, setShowEditModal, getEvaluacionTodos) => {
  try {
    await updateEvaluacion(idEvaluacion, idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus);
    getEvaluacionTodos();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Evaluación actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el registro de evaluación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el registro de evaluación.',
    });
  }
};

// Eliminar un registro de Evaluacion
export const deleteEvaluacionFunc = async (idEvaluacion, setShowDeleteModal, getEvaluacionTodos) => {
  try {
    await deleteEvaluacion(idEvaluacion);
    getEvaluacionTodos();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Evaluación eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el registro de evaluación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el registro de evaluación.',
    });
  }
};
