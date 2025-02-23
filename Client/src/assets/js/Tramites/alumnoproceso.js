//Act. 
import Swal from 'sweetalert2';
import { getAlumnoProcesos, createAlumnoProceso, updateAlumnoProceso, deleteAlumnoProceso }
 from '../../../api/Tramites/alumnoproceso.api.js';

export const getAlumnoProceso = async (setAlumnoProceso) => {
  try {
    const data = await getAlumnoProcesos();
    setAlumnoProceso(data);
  } catch (error) {
    console.error('Error al obtener los procesos de alumnos:', error);
  }
};

export const addAlumnoProceso = async (idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion, setShowModal, getAlumnoProceso) => {
  try {
    await createAlumnoProceso(idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion);
    getAlumnoProceso();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Proceso de alumno registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el proceso de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el proceso de alumno.',
    });
  }
};

export const updateAlumnoProcesoFunc = async (idAlumnoProceso, idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion, setShowEditModal, getAlumnoProceso) => {
  try {
    await updateAlumnoProceso(idAlumnoProceso, idAlumnoTramite, idTramiteProceso, idActividad, orden, estatus, observacion);
    getAlumnoProceso();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Proceso de alumno actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el proceso de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el proceso de alumno.',
    });
  }
};

export const deleteAlumnoProcesoFunc = async (idAlumnoProceso, setShowDeleteModal, getAlumnoProceso) => {
  try {
    await deleteAlumnoProceso(idAlumnoProceso);
    getAlumnoProceso();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Proceso de alumno eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el proceso de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el proceso de alumno.',
    });
  }
};
