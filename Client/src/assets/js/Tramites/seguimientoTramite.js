//Act. 
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

export const addAlumnoTramite = async (idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, getAlumnoTramite) => {
  console.log("saliendo", { idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus });
  try {
    await createAlumnoTramite(idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus);
    getAlumnoTramite();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Trámite de alumno registrado correctamente',
    });
  } catch (error) {
    console.error('Error al agregar el trámite de alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el trámite de alumno.',
    });
  }
};

export const updateAlumnoTramiteFunc = async (idAlumnoTramite, idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus, setShowEditModal, getAlumnoTramite) => {
  console.log("saliendo", { idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus });
  try {
    await updateAlumnoTramite(idAlumnoTramite, idTramite, idPersona, idAlumnoPA, idPeriodo, fecha, estatus);
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
    console.log("Intentando eliminar trámite con ID:", idAlumnoTramite);
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
