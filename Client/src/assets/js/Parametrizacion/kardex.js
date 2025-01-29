import Swal from 'sweetalert2';
import { getKardex, createKardex, updateKardex, deleteKardex } 
from '../../../api/Parametrizacion/kardex.api.js';

// Obtener todos los registros
export const getKardexjs = async (setKardexjs) => {
  try {
    const data = await getKardex();
    setKardexjs(data);
  } catch (error) {
    console.error('Error al obtener los registros del kardex en js:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema obteniendo los registros del kardex.',
    });
  }
};

// Crear un nuevo registro
export const addKardex = async (idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo, setShowModal, getKardexjs) => {
 
  if (!idAlumnoPrograma || !id_mapa_curricular || !idGrupo || !id_periodo || !CalificacionFinal || !Tipo) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Todos los campos son obligatorios para registrar un kardex.',
    });
  }
   
  try {
    await createKardex(idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo);
      await getKardexjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Kardex registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el registro del kardex:', error);
    // Manejo robusto de error
    if (error.response) {
      // Si la API responde con un error, muestra el mensaje de la respuesta
      console.log('Respuesta del servidor:', error.response);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response.data.message || 'Hubo un problema registrando el kardex.',
      });
    } else if (error.request) {
      // Si no hay respuesta del servidor
      console.log('No se recibió respuesta del servidor:', error.request);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se recibió respuesta del servidor. Por favor, revisa tu conexión o la configuración de la API.',
      });
    } else {
      // Si ocurrió un error al configurar la solicitud
      console.log('Error al configurar la solicitud:', error.message);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al configurar la solicitud.',
      });
    }
  }}

// Actualizar un registro
export const updateKardexjs = async (IdKardex, idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo, setShowEditModal, getKardexjs) => {
  if (!IdKardex || !idAlumnoPrograma || !id_mapa_curricular || !idGrupo || !id_periodo || !CalificacionFinal || !Tipo) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Todos los campos son obligatorios para actualizar un kardex.',
    });
  }
  try {
    await updateKardex(IdKardex, { idAlumnoPrograma, id_mapa_curricular, idGrupo, id_periodo, CalificacionFinal, Tipo });
    await getKardexjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Kardex actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el kardex:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema actualizando el kardex.',
    });
  }
};

// Eliminar un registro
export const deleteKardexjs = async (IdKardex, setShowDeleteModal, getKardexjs) => {
  if (!IdKardex) {
    return Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'El ID del kardex es obligatorio para eliminarlo.',
    });
  }
  try {
    await deleteKardex(IdKardex);
    await getKardexjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Kardex eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el kardex:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema eliminando el kardex.',
    });
  }
};
