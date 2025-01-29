import Swal from 'sweetalert2'; 

import { createTramite, deleteTramite, getTramites, updateTramite } 
from '../../../api/Parametrizacion/tramite.api.js'; 

export const getTramite = async (setTramite) => {
  try {
    const data = await getTramites();
    setTramite(data);
  } catch (error) {
    console.error('Error al obtener los Tramites:', error);
  }
};

export const addTramite = async (nombre, desde, hasta, setShowModal, getTramite) => {
  try {
    await createTramite(nombre, desde, hasta);
    getTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar un trámite:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando un trámite.',
    });
  }
};

export const updateTramiteFunc = async (idTramite, nombre, desde, hasta, setShowEditModal, getTramite) => {
  try {
    await updateTramite(idTramite, nombre, desde, hasta);
    getTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar un trámite:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando un trámite.',
    });
  }
};

export const deleteTramiteFunc = async (idTramite, setShowDeleteModal, getTramite) => {
  try {
    await deleteTramite(idTramite);
    getTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el trámite:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando un trámite.',
    });
  }
};
