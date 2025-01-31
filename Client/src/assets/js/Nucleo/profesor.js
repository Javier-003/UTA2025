import Swal from 'sweetalert2'; 

import { createProfesor, deleteProfesor, getProfesores, updateProfesor } 
from '../../../api/Nucleo/profesor.api.js'; 

export const getProfesor = async (setProfesor) => {
  try {
    const data = await getProfesores();
    setProfesor(data);
  } catch (error) {
    console.error('Error al obtener los profesores:', error);
  }
};

export const addProfesor = async (idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowModal, getProfesor) => {
  try {
    await createProfesor(idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc);
    getProfesor();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Profesor registrado correctamente',
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

export const updateProfesorFunc = async (idProfesor, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc, setShowEditModal, getProfesor) => {
  try {
    await updateProfesor(idProfesor, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc);
    getProfesor();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Profesor actualizado correctamente',
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

export const deleteProfesorFunc = async (idProfesor, setShowDeleteModal, getProfesor) => {
  try {
    await deleteProfesor(idProfesor);
    getProfesor();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Profesor eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el profesor:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el profesor.',
    });
  }
};
