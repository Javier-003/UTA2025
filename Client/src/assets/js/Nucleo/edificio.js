import Swal from 'sweetalert2'; 

import { getEdificios, createEdificio, updateEdificio, deleteEdificio }
 from '../../../api/Nucleo/edificio.api.js'; 

export const getEdificio = async (setEdificio) => {
  try {
    const data = await getEdificios();
    setEdificio(data);
  } catch (error) {
    console.error('Error al obtener los Edificios:', error);
  }
};

export const addEdificio = async (nombre,sigla,setShowModal, getEdificio) => {
  try {
    await createEdificio(nombre , sigla);
    getEdificio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Edificio registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar un Edificio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando un Edificio.',
    });
  }
};

export const updateEdificioFunc = async (idEdificio, nombre,sigla, setShowEditModal, getEdificio) => {
  try {
    await updateEdificio(idEdificio, nombre, sigla);
    getEdificio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Edificio actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar la edificio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando la edificio.',
    });
  }
};
export const deleteEdifcioFunc = async (idEdificio, setShowDeleteModal, getEdificio) => {
  try {
    await deleteEdificio(idEdificio);
    getEdificio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Edificio eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el Edificio:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el Edificio.',
    });
  }
};
