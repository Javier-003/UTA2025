import Swal from 'sweetalert2'; 

import { getBloquees, createBloque, updateBloque,deleteBloque } 
from '../../../api/PlanificacionAcademica/bloque.api.js'; 

export const getBloque = async (setBloque) => {
  try {
    const data = await getBloquees();
    setBloque(data);
  } catch (error) {
    console.error('Error al obtener los bloques:', error);
  }
};

export const addBloque = async (Nombre, Duracion, HoraInicio, HoraFin, setShowModal, getBloque) => {
    try {
      await createBloque(Nombre, Duracion, HoraInicio, HoraFin);
      getBloque();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Bloque registrado correctamente',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error al agregar el bloque:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema registrando el bloque.',
      });
    }
};

export const updateBloqueFunc = async (idBloque, Nombre, Duracion, HoraInicio, HoraFin, setShowEditModal, getBloque) => {
    try {
        await updateBloque(idBloque, Nombre, Duracion, HoraInicio, HoraFin);
        getBloque();
        Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Bloque actualizado correctamente',
        });
        setShowEditModal(false);
    } catch (error) {
        console.error('Error al actualizar el Bloque:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Hubo un problema actualizando el Bloque.',
        });
    }
};

export const deleteBloqueFunc = async (idBloque, setShowDeleteModal, getBloque) => {
    try {
      await deleteBloque(idBloque);
      getBloque();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Bloque eliminado correctamente',
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al eliminar el bloque:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema eliminando el bloque.',
      });
    }
  };
  