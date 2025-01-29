import Swal from 'sweetalert2'; 

import { getAlumnosPrograma, createAlumnoPrograma, updateAlumnoPrograma, deleteAlumnoPrograma } 
from '../../../api/Parametrizacion/alumnopa.api.js';

// Obtener todos los registros de alumno_programa
export const getAlumnoPrograma = async (setAlumnoPrograma) => {
  try {
    const data = await getAlumnosPrograma();
    setAlumnoPrograma(data);
  } catch (error) {
    console.error('Error al obtener los registros de alumno_programa:', error);
  }
};

// Crear un nuevo registro de alumno_programa
export const addAlumnoPrograma = async (idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowModal, getAlumnoPrograma) => {
  try {
    await createAlumnoPrograma(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta);
    getAlumnoPrograma();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Alumno_programa registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el registro de alumno_programa:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el registro de alumno_programa.',
    });
  }
};

// Actualizar un registro de alumno_programa existente
export const updateAlumnoProgramaFunc = async (idAlumnoPrograma, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowEditModal, getAlumnoPrograma) => {
  try {
    await updateAlumnoPrograma(idAlumnoPrograma, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta);
    getAlumnoPrograma();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Alumno_programa actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el registro de alumno_programa:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el registro de alumno_programa.',
    });
  }
};

// Eliminar un registro de alumno_programa
export const deleteAlumnoProgramaFunc = async (idAlumnoPrograma, setShowDeleteModal, getAlumnoPrograma) => {
  try {
    await deleteAlumnoPrograma(idAlumnoPrograma);
    getAlumnoPrograma();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Alumno_programa eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el registro de alumno_programa:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el registro de alumno_programa.',
    });
  }
};
