import Swal from 'sweetalert2'; 

import {getHorario, createHorario, updateHorario, deleteHorario } 
from '../../../api/PlanificacionAcademica/horario.api.js'; 

export const getHorariojs = async (setHorariojs) => {
  try {
    const data = await getHorario();
    setHorariojs(data);
  } catch (error) {
    console.error('Error al obtener los horarios:', error);
  }
};

export const addHorario = async (idGrupoMateria, id_Bloque, dia, setShowModal, getHorariojs) => {
  try {
    await createHorario(idGrupoMateria, id_Bloque, dia);
    getHorariojs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Horario registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar un Horario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando un Horario.',
    });
  }
};

export const updateHorariojs = async (idHorario, idGrupoMateria, id_Bloque, dia, setShowEditModal, getHorariojs) => {
  try {
    await updateHorario(idHorario, idGrupoMateria, id_Bloque, dia);
    getHorariojs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Edificio actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el horario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el horario.',
    });
  }
};

export const deleteHorariojs = async (idHorario, setShowDeleteModal, getEdificio) => {
  try {
    await deleteHorario(idHorario);
    getEdificio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Horario eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el horario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el horario.',
    });
  }
};
