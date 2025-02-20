import Swal from 'sweetalert2'; 

import { getMateriaU, createMateriaU, updateMateriaU, deleteMateriaU } 
from '../../../api/Parametrizacion/materiaunidad.api.js'; 

export const getMateriajs = async (setMateriajs) => {
  try {
    const data = await getMateriaU();
    setMateriajs(data);
  } catch (error) {
    console.error('Error al obtener las unidades de materias:', error);
  }
};

export const addMateriajs = async (idMapaCurricular, unidad, nombre, setShowModal) => {
  try {
    await createMateriaU(idMapaCurricular, unidad, nombre);
    getMateriajs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad registrada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar Materia Unidad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando una Materia Unidad.',
    });
  }
};

export const updateMateriajs = async (idMateriaUnidad, idMapaCurricular, unidad, nombre, setShowEditModal, getMateriajs) => {
  try {
    await updateMateriaU(idMateriaUnidad, idMapaCurricular, unidad, nombre);
    getMateriajs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar la Materia Unidad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando la Materia Unidad.',
    });
  }
};

export const deleteMateriajs = async (idMateriaUnidad, setShowDeleteModal, getMateriajs) => {
  try {
    await deleteMateriaU(idMateriaUnidad);
    getMateriajs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar Materia Unidad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando Materia Unidad.',
    });
  }
};
