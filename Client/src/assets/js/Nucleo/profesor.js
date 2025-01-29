import Swal from 'sweetalert2'; 

import { createProfesor, deleteProfesor, getProfesores, updateProfesor } 
from '../../../api/Nucleo/profesor.api.js'; 

export const getProfesor = async (setProfesor) => {
  try {
    const data = await getProfesores();
    setProfesor(data);
  } catch (error) {
    console.error('Error al obtener las aulas:', error);
  }
};

export const addProfesor = async ( id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc, setShowModal, getProfesor) => {
    try {
      await createProfesor( id_departamento, id_puesto, clave, perfil, email, no_cedula, programa_academicos, nss, rfc);
      getProfesor();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Profesor registrada correctamente',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error al agregar el profesor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema registrando el profesor.',
      });
    }
};

export const updateProfesorFunc = async (id_profesor, NombreDepartamento, NombrePuesto,
     clave, perfil, email, no_cedula, programa_academicos, nss, setShowEditModal, getProfesor) => {
    try {
      await updateProfesor(id_profesor,NombreDepartamento, NombrePuesto, clave, perfil, email, no_cedula, programa_academicos, nss);
      getProfesor();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Profesor actualizada correctamente',
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar el profesor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema actualizando el profesor.',
      });
    }
};

export const deleteProfesorFunc = async (id_profesor, setShowDeleteModal, getProfesor) => {
    try {
      await deleteProfesor(id_profesor);
      getProfesor();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Profesor eliminada correctamente',
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al eliminar el profeesor:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema eliminando el profesor.',
      });
    }
};
