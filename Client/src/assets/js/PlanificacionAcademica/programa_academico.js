import Swal from 'sweetalert2'; 

import {  getProgramaacademicos,createProgramaAcademico,updateProgramaAcademico, deleteProgramaAcademico } 
from '../../../api/PlanificacionAcademica/programa_academico.api.js'; 

export const getProgramaAcademico = async (setProgramaAcademico) => {
  try {
    const data = await getProgramaacademicos();
    setProgramaAcademico(data);
  } catch (error) {
    console.error('Error al obtener las programa academicos:', error);
  }
};

export const addProgramaAcademico = async (id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, 
    sigla, total_cuatrimestre, desde, hasta, estatus, setShowEditModal,getProgramaAcademico) => {
    try {
      await createProgramaAcademico(id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus);
      getProgramaAcademico();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Programa academicos registrada correctamente',
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al agregar el programa academico:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema registrando el programa academico.',
      });
    }
};

export const updateProgramaAcademicoFunc = async (id_programa_academico, NombreNivelEstudio, Titulo_Tsu, 
    Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus, setShowEditModal, getProgramaAcademico) => {
    try {
      await updateProgramaAcademico(id_programa_academico, NombreNivelEstudio,Titulo_Tsu, Titulo_Ing, 
        descripcion, sigla, total_cuatrimestre, desde, hasta, estatus);
        getProgramaAcademico();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Aula actualizada correctamente',
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar el aula:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema actualizando el aula.',
      });
    }
};
  
export const deleteProgramaAcademicoFunc = async (id_programa_academico, setShowDeleteModal, getProgramaAcademico) => {
    try {
      await deleteProgramaAcademico(id_programa_academico);
      getProgramaAcademico();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Programa Academico eliminada correctamente',
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al eliminar el Programa Academico:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema eliminando el Programa Academico.',
      });
    }
};
