import Swal from 'sweetalert2';
import { createAlumno, getAlumnos, updateAlumno, deleteAlumno } from '../../../api/Nucleo/alumno.api.js'; 

export const getAlumno = async (setAlumno) => {
  try {
    const data = await getAlumnos();
    setAlumno(data);
  } catch (error) {
    console.error('Error al obtener los alumnos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema obteniendo los alumnos.',
    });
  }
};

export const addAlumno = async (idPersona, email, fecha, nss, setShowModal, getAlumno) => {
  try {
    await createAlumno(idPersona, email, nss, fecha);
    getAlumno();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Alumno registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema registrando el alumno.',
    });
  }
};

export const updateAlumnoFunc = async (idAlumno, email, fecha, nss, setShowEditModal, getAlumno) => {
  try {
    await updateAlumno(idAlumno, email, nss, fecha);
    getAlumno();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Alumno actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema actualizando el alumno.',
    });
  }
};

export const deleteAlumnoFunc = async (idAlumno, setShowDeleteModal, getAlumno) => {
  try {
    await deleteAlumno(idAlumno);
    getAlumno();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Alumno eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el alumno:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema eliminando el alumno.',
    });
  }
};
