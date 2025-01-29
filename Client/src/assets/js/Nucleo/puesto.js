import Swal from 'sweetalert2'; 
import { getPuestos, createPuesto, updatePuesto, deletePuesto } from '../../../api/Nucleo/puesto.api.js'; 

export const getPuesto = async (setPuesto) => {
  try {
    const data = await getPuestos();
    setPuesto(data);
  } catch (error) {
    console.error('Error al obtener los puestos:', error);
  }
};

export const addPuesto = async (id_departamento, nombre, setShowModal, getPuesto) => {
  try {
    await createPuesto(id_departamento, nombre);
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

export const updatePuestoFunc = async (id_puesto, id_departamento, nombre, setShowEditModal, getPuesto) => {
  try {
    await updatePuesto(id_puesto, id_departamento, nombre);
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

export const deletePuestoFunc = async (id_puesto, setShowDeleteModal, getPuesto) => {
  try {
    await deletePuesto(id_puesto);
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
