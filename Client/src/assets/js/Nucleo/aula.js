import Swal from 'sweetalert2'; 

import { getAulas, createAula, updateAula, deleteAula } 
from '../../../api/Nucleo/aula.api.js'; 

export const getAula = async (setAula) => {
  try {
    const data = await getAulas();
    setAula(data);
  } catch (error) {
    console.error('Error al obtener las aulas:', error);
  }
};

export const addAula = async (IdEdificio, AulaTipo, Nombre, SIGLA, setShowModal, getAula) => {
  try {
    await createAula(IdEdificio, AulaTipo, Nombre, SIGLA);
    getAula();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Aula registrada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el aula:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el aula.',
    });
  }
};

export const updateAulaFunc = async (IdAula, NombreEdificio, AulaTipo, Nombre, SIGLA, setShowEditModal, getAula) => {
  try {
    await updateAula(IdAula, NombreEdificio, AulaTipo, Nombre, SIGLA);
    getAula();
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

export const deleteAulaFunc = async (IdAula, setShowDeleteModal, getAula) => {
  try {
    await deleteAula(IdAula);
    getAula();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Aula eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el aula:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el aula.',
    });
  }
};
