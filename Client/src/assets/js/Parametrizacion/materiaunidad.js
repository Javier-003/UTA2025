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

// onSuccess: callback que cierra el modal y recarga la lista (lo define la pagina).
// Antes este parametro se llamaba setShowModal y la pagina mandaba un argumento de
// mas (nombreOficial), por lo que aqui llegaba un texto en vez de una funcion.
export const addMateriajs = async (idMapaCurricular, unidad, nombre, onSuccess) => {
  try {
    await createMateriaU(idMapaCurricular, unidad, nombre);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad registrada correctamente',
    });
    if (typeof onSuccess === 'function') onSuccess();
  } catch (error) {
    console.error('Error al agregar Materia Unidad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando una Materia Unidad.',
    });
  }
};

// onSuccess: cierra el modal y recarga la lista (lo define la pagina).
export const updateMateriajs = async (idMateriaUnidad, idMapaCurricular, unidad, nombre, onSuccess) => {
  try {
    await updateMateriaU(idMateriaUnidad, idMapaCurricular, unidad, nombre);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad actualizada correctamente',
    });
    if (typeof onSuccess === 'function') onSuccess();
  } catch (error) {
    console.error('Error al actualizar la Materia Unidad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando la Materia Unidad.',
    });
  }
};

// onSuccess: cierra el modal y recarga la lista (lo define la pagina).
export const deleteMateriajs = async (idMateriaUnidad, onSuccess) => {
  try {
    await deleteMateriaU(idMateriaUnidad);
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia Unidad eliminada correctamente',
    });
    if (typeof onSuccess === 'function') onSuccess();
  } catch (error) {
    console.error('Error al eliminar Materia Unidad:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando Materia Unidad.',
    });
  }
};
