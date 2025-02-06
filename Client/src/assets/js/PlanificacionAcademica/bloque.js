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

export const addBloque = async (nombre, duracion, horaInicio, horaFin, setShowModal, getBloque) => {
  console.log("llegando a api", {nombre, duracion, horaInicio, horaFin})
    try {
      console.log("llegando a api 2", {nombre, duracion, horaInicio, horaFin})
      await createBloque(nombre, duracion, horaInicio, horaFin);
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

export const updateBloqueFunc = async (idBloque, nombre, duracion, horaInicio, horaFin, setShowEditModal, getBloque) => {
    try {
        await updateBloque(idBloque, nombre, duracion, horaInicio, horaFin);
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
  