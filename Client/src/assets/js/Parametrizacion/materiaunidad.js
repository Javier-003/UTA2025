import Swal from 'sweetalert2'; 

import {getMateriaU, createMateriaU, updateMateriaU, deleteMateriaU } 
from '../../../api/Parametrizacion/materiaunidad.api.js'; 

export const getMateriajs = async (setMateriajs) => {
  try {
    const data = await getMateriaU();
    setMateriajs(data);
  } catch (error) {
    console.error('Error al obtener las unidades de materias:', error);
  }
};

export const addMateriajs = async (id_mapa_curricular, Unidad, Nombre, setShowModal) => {
  try {
    await createMateriaU(id_mapa_curricular, Unidad, Nombre);
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

export const updateMateriajs = async (IdMateriaUnidad, id_mapa_curricular, Unidad, Nombre, setShowEditModal, getMateriajs) => {
  try {
    await updateMateriaU(IdMateriaUnidad, id_mapa_curricular, Unidad, Nombre);
    getMateriajs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar la Materia Unidad.:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando la Materia Unidad.',
    });
  }
};

export const deleteMateriajs = async (IdMateriaUnidad, setShowDeleteModal, getMateriajs) => {
  try {
    await deleteMateriaU(IdMateriaUnidad);
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
