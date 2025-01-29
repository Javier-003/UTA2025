import Swal from 'sweetalert2'; 

import { getActividades, createActividad, updateActividad, deleteActividad } 
from '../../../api/Parametrizacion/actividad.api.js'; 

export const getActividad = async (setActividad) => {
  try {
    const data = await getActividades();
    setActividad(data);
  } catch (error) {
    console.error('Error al obtener las actividades:', error);
  }
};

export const addActividad = async (nombre, setShowModal, getActividad) => {
  try {
    await createActividad(nombre);
    getActividad();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Actividad registrada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar la actividad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando la actividad.',
    });
  }
};

export const updateActividadFunc = async (idActividad, nombre, setShowEditModal, getActividad) => {
  try {
    await updateActividad(idActividad, nombre);
    getActividad();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Actividad actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar la actividad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando la actividad.',
    });
  }
};

export const deleteActividadFunc = async (idActividad, setShowDeleteModal, getActividad) => {
  try {
    await deleteActividad(idActividad);
    getActividad();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Actividad eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar la actividad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando la actividad.',
    });
  }
};
