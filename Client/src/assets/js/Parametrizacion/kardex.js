import Swal from 'sweetalert2'; 

import { createKardex, deleteKardex, getKardex, updateKardex } 
from '../../../api/Parametrizacion/kardex.api.js';


// Obtener todos los registros de Kardex
export const getKardexTodos = async (setKardex) => {
  try {
    const data = await getKardex();
    setKardex(data);
  } catch (error) {
    console.error('Error al obtener los registros de kardex:', error);
  }
};

// Crear un nuevo registro de Kardex
export const addKardexFun = async (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, setShowModal, getKardex) => {
  try {
    await createKardex(idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo);
    getKardex();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Kardex registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el registro de kardex:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el registro de kardex.',
    });
  }
};

// Actualizar un registro de Kardex existente
export const updateKardexFunc = async (idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo, setShowEditModal, getKardex) => {
  try {
    await updateKardex(idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo);
    getKardex();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Kardex actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el registro de kardex:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el registro de kardex.',
    });
  }
};

// Eliminar un registro de Kardex
export const deleteKardexFunc = async (idKardex, setShowDeleteModal, getKardex) => {
  try {
    await deleteKardex(idKardex);
    getKardex();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Kardex eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el registro de kardex:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el registro de kardex.',
    });
  }
};
