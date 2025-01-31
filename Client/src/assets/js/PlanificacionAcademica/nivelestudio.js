import Swal from 'sweetalert2'; 

import { getnivelestudios, createNivelEstudio, updateNivelEstudio, deleteNivelEstudio } 
from '../../../api/PlanificacionAcademica/nivelestudio.api.js'; 

export const getnivelestudio = async (setNivelEstudio) => {
  try {
    const data = await getnivelestudios();
    setNivelEstudio(data);
  } catch (error) {
    console.error('Error al obtener los niveles de estudio:', error);
  }
};

export const addNivelEstudio = async (nombre, descripcion, sigla, setShowModal, getnivelestudio) => {
  try {
    await createNivelEstudio(nombre, descripcion, sigla);
    getnivelestudio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Nivel de estudio registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar un nivel de estudio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el nivel de estudio.',
    });
  }
};

export const updateNivelEstudioFunc = async (idnivelEstudio, nombre, descripcion, sigla, setShowEditModal, getnivelestudio) => {
  try {
    await updateNivelEstudio(idnivelEstudio, nombre, descripcion, sigla);
    getnivelestudio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Nivel de estudio actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el nivel de estudio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el nivel de estudio.',
    });
  }
};

export const deleteNivelEstudioFunc = async (idnivelEstudio, setShowDeleteModal, getnivelestudio) => {
  try {
    await deleteNivelEstudio(idnivelEstudio);
    getnivelestudio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Nivel de estudio eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el nivel de estudio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el nivel de estudio.',
    });
  }
};
