import Swal from 'sweetalert2';
import { getAlumnoTramites, createAlumnoTramite, updateAlumnoTramite, deleteAlumnoTramite }
 from '../../../api/Tramites/alumnotramite.api.js';

export const getAlumnoTramite = async (setAlumnoTramite) => {
  try {
    const data = await getAlumnoTramites();
    setAlumnoTramite(data);
  } catch (error) {
    console.error('Error al obtener los trámites de alumnos:', error);
  }
};

export const addAlumnoTramite = async (idTramite, idAlumnoPA, idPeriodo, fecha, estatus, setShowModal, getAlumnoTramite) => {
  try {
    await createAlumnoTramite(idTramite, idAlumnoPA, idPeriodo, fecha, estatus);
    getAlumnoTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite de alumno registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el trámite de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el trámite de alumno.',
    });
  }
};

export const updateAlumnoTramiteFunc = async (idAlumnoTramite, idTramite, idAlumnoPA, idPeriodo, fecha, estatus, setShowEditModal, getAlumnoTramite) => {
  try {
    await updateAlumnoTramite(idAlumnoTramite, idTramite, idAlumnoPA, idPeriodo, fecha, estatus);
    getAlumnoTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite de alumno actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el trámite de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el trámite de alumno.',
    });
  }
};

export const deleteAlumnoTramiteFunc = async (idAlumnoTramite, setShowDeleteModal, getAlumnoTramite) => {
  try {
    await deleteAlumnoTramite(idAlumnoTramite);
    getAlumnoTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite de alumno eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el trámite de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el trámite de alumno.',
    });
  }
};
