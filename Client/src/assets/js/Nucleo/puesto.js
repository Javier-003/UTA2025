import Swal from 'sweetalert2'; 
import { getPuestos, createPuesto, updatePuesto, deletePuesto } 
from '../../../api/Nucleo/puesto.api.js'; 

export const getPuesto = async (setPuesto) => {
  try {
    const data = await getPuestos();
    setPuesto(data);
  } catch (error) {
    console.error('Error al obtener los puestos:', error);
  }
};

export const addPuesto = async (idDepartamento, nombre, setShowModal, getPuesto) => {
  try {
    await createPuesto(idDepartamento, nombre);
    getPuesto();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Puesto registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el puesto:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el puesto.',
    });
  }
};

export const updatePuestoFunc = async (idPuesto, idDepartamento, nombre, setShowEditModal, getPuesto) => {
  try {
    await updatePuesto(idPuesto, idDepartamento, nombre);
    getPuesto();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Puesto actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el puesto:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el puesto.',
    });
  }
};

export const deletePuestoFunc = async (idPuesto, setShowDeleteModal, getPuesto) => {
  try {
    await deletePuesto(idPuesto);
    getPuesto();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Puesto eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el puesto:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el puesto.',
    });
  }
};
