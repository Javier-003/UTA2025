import Swal from 'sweetalert2';

import { getEvaluacion, createEvaluacion, updateEvaluacion, deleteEvaluacion } 
from '../../../api/Parametrizacion/evaluacion.api.js';

// Obtener todos los registros de Evaluacion
export const getEvaluacionTodos = async (idGrupoMateria) => {
  try {
    const data = await getEvaluacion(idGrupoMateria);
    return data;
  } catch (error) {
    console.error('Error al obtener los registros de evaluación:', error);
    throw new Error('Error al obtener los registros de evaluación');
  }
};

// Crear un nuevo registro de Evaluacion
export const addEvaluacion = async (idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) => {
  try {
    // console.log("Datos enviados a createEvaluacion:", { idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus });
    await createEvaluacion(idKadex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Evaluación registrada correctamente',
    });
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
export const updateEvaluacionFunc = async (idEvaluacion, idKardex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus) => {
  try {
    // console.log("Datos recibidos en updateEvaluacion:", { idEvaluacion, idKardex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus });
    await updateEvaluacion(idEvaluacion, idKardex, idMapaCurricular, idMateriaUnidad, calificacion, faltas, nombreUnidad, estatus);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Evaluación actualizada correctamente',
    });
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
export const deleteEvaluacionFunc = async (idEvaluacion) => {
  try {
    await deleteEvaluacion(idEvaluacion);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Evaluación eliminada correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar el registro de evaluación:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el registro de evaluación.',
    });
  }
};