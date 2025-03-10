import Swal from 'sweetalert2'; 

import { createalumnoPA, deletealumnoPA, getAlumnoPA, updatealumnoPA, transaccionUpdateAlumnopa } 
from '../../../api/Parametrizacion/alumnopa.api.js';

// Obtener todos los registros de AlumnoPA
export const getAlumnopatodos = async (setalumnopa) => {
  try {
    const data = await getAlumnoPA();
    setalumnopa(data);
  } catch (error) {
    console.error('Error al obtener los registros de alumnoPA:', error);
  }
};

// Crear un nuevo registro de AlumnoPA
export const addAlumnoPa = async (idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowModal, getalumnopa) => {
  try {
    await createalumnoPA(idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta);
    getalumnopa();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'AlumnoPA registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el registro de AlumnoPA:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el registro de AlumnoPA.',
    });
  }
};

// Actualizar un registro de AlumnoPA existente
export const updateAlumnoPaFunc = async (idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowEditModal, getalumnopa) => {
  try {
    await updatealumnoPA(idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta);
    getalumnopa();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'AlumnoPA actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el registro de AlumnoPA:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el registro de AlumnoPA.',
    });
  }
};


// Actualizar un registro de AlumnoPA existente
export const transaccionUpdateAlumnopaJS = async (idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta, setShowEdit2Modal, getalumnopa) => {
  console.log("Datos enviados UPDATE PA JS:", {idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta});
  try {
    await transaccionUpdateAlumnopa(idAlumnoPA, idAlumno, idProgramaAcademico, idPeriodo, matricula, estatus, desde, hasta);
    getalumnopa();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'EStado actualizado correctamente',
    });
    setShowEdit2Modal(false);
  } catch (error) {
    console.error('Error al actualizar el Estado:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el estado.',
    });
  }
};


// Eliminar un registro de AlumnoPA
export const deleteAlumnoPAFunc = async (idAlumnoPA, setShowDeleteModal, getalumnopa) => {
  try {
    await deletealumnoPA(idAlumnoPA);
    getalumnopa();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'AlumnoPA eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el registro de AlumnoPA:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el registro de AlumnoPA.',
    });
  }
};
