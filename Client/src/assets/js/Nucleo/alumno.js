import Swal from 'sweetalert2'; 

import { createAlumno,  getAlumnos, updateAlumno, deleteAlumno} 
from '../../../api/Nucleo/alumno.api.js'; 

export const getAlumno = async (setAlumno) => {
  try {
    const data = await getAlumnos();
    setAlumno(data);
  } catch (error) {
    console.error('Error al obtener los alumno:', error);
  }
};

export const addAlumno = async (email,promedio,cuatrimestre,fecha_registro,nss, setShowModal,getAlumno) => {
    try {
      await createAlumno(email,promedio,cuatrimestre,fecha_registro,nss);
      getAlumno();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Alumno registrada correctamente',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error al agregar el alumno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema registrando el alumno.',
      });
    }
};

export const updateAlumnoFunc = async (id_alumno, email,promedio,cuatrimestre,fecha_registro,nss, setShowEditModal, getAlumno) => {
    try {
      await updateAlumno(id_alumno, email,promedio,cuatrimestre,fecha_registro,nss);
      getAlumno();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Alumno actualizada correctamente',
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar el alumno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema actualizando el alumno.',
      });
    }
};

export const deleteAlumnoFunc = async (id_alumno, setShowDeleteModal, getAlumno) => {
    try {
      await deleteAlumno(id_alumno);
      getAlumno();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Alumno eliminada correctamente',
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al eliminar el alumno:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema eliminando el alumno.',
      });
    }
};
  