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

export const addAula = async (idEdificio, tipo, nombre, sigla, setShowModal, getAula) => {
  try {
    await createAula(idEdificio, tipo, nombre, sigla);
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

export const updateAulaFunc = async (idAula, idEdificio, tipo, nombre, sigla, setShowEditModal, getAula) => {
  try {
    await updateAula(idAula, idEdificio, tipo, nombre, sigla);
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

export const deleteAulaFunc = async (idAula, setShowDeleteModal, getAula) => {
  try {
    await deleteAula(idAula);
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
