import Swal from 'sweetalert2'; 

import { getTramitesProcesos,createTramiteProceso,updateTramiteProceso, deleteTramiteProceso} 
from '../../../api/Parametrizacion/tramiteproceso.api.js'; 

export const getTramitesProceso = async (setTramiteProceso) => {
  try {
    const data = await getTramitesProcesos();
    setTramiteProceso(data);
  } catch (error) {
    console.error('Error al obtener las tramite proceso:', error);
  }
};

export const addTramiteProceso = async (idTramite, idActividad, objeto, orden, setShowModal, getTramitesProceso) => {
  try {
    await createTramiteProceso(idTramite, idActividad, objeto, orden);
    getTramitesProceso();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'tramite proceso registrada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el tramite proceso:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el tramite proceso.',
    });
  }
};

export const updateTramiteProcesoFunc = async ( idTramiteProceso, idTramite, idActividad, objeto, orden,  setShowEditModal, getTramitesProceso) => {
  try {
    await updateTramiteProceso( idTramiteProceso, idTramite, idActividad, objeto, orden,  setShowEditModal, getTramitesProceso);
    getTramitesProceso();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'tramite proceso actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el tramite proceso:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el tramite proceso.',
    });
  }
};

export const deleteTramiteProcesoFunc = async (idTramiteProceso, setShowDeleteModal, getTramitesProceso) => {
  try {
    await deleteTramiteProceso(idTramiteProceso);
    getTramitesProceso();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'tramite proceso eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el tramite proceso:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el tramite proceso.',
    });
  }
};
