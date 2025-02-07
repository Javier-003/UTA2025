import Swal from 'sweetalert2';
import {  getProgramaacademicos,createProgramaAcademico,updateProgramaAcademico, deleteProgramaAcademico } 
from '../../../api/PlanificacionAcademica/programa_academico.api.js'; 

// Obtener todos los programas académicos
export const getProgramaAcademico = async (setProgramaAcademico) => {
  try {
    const data = await getProgramaacademicos();
    setProgramaAcademico(data);
  } catch (error) {
    console.error("Error al obtener los programas académicos:", error);
  }
};

// Crear un programa académico
export const addProgramaAcademico = async (idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus, setShowEditModal, getProgramaAcademico) => {
  console.log("llegando a datos .js", { idNivelEstudio, idOfertaAcademica, nombre,nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus });
  try {
    await createProgramaAcademico(idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus);
    getProgramaAcademico();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Programa académico registrado con éxito',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al registrar el programa académico:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al registrar el programa académico',
    });
  }
};

// Actualizar un programa académico
export const updateProgramaAcademicoFunc = async (idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus, setShowEditModal, getProgramaAcademico) => {
  console.log("Enviando datos actualizar .js:", { idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus });
  try {
    await updateProgramaAcademico(idProgramaAcademico, idNivelEstudio, idOfertaAcademica, nombre, nombreOficial, descripcion, sigla, anio, totalPeriodos, totalCreditos, desde, hasta, estatus);
    getProgramaAcademico();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Programa académico actualizado con éxito',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el programa académico:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al actualizar el programa académico',
    });
  }
};

// Eliminar un programa académico
export const deleteProgramaAcademicoFunc = async (idProgramaAcademico, setShowDeleteModal, getProgramaAcademico) => {
  try {
    await deleteProgramaAcademico(idProgramaAcademico);
    getProgramaAcademico();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Programa académico eliminado con éxito',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el programa académico:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Error al eliminar el programa académico',
    });
  }
};