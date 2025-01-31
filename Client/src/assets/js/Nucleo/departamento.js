import Swal from 'sweetalert2'; 

import { getDepartamentos, createDepartamento, updateDepartamento, deleteDepartamento } 
from '../../../api/Nucleo/departamento.api.js'; 

export const getDepartamento = async (setDepartamento) => {
  try {
    const data = await getDepartamentos();
    setDepartamento(data);
  } catch (error) {
    console.error('Error al obtener los Departamentos:', error);
  }
};

export const addDepartamento = async (nombre, sigla,setShowModal, getDepartamento) => {
  try {
    await createDepartamento(nombre , sigla);
    getDepartamento();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Departamento registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar un Departamento:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando un Departamento.',
    });
  }
};

export const updateDepartamentoFunc = async (idDepartamento, nombre,sigla, setShowEditModal, getDepartamento) => {
  try {
    await updateDepartamento(idDepartamento, nombre, sigla);
    getDepartamento();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Departamento actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar la departamento:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando la departamento.',
    });
  }
};

export const deleteDepartamentoFunc = async (idDepartamento, setShowDeleteModal, getDepartamento) => {
  try {
    await deleteDepartamento(idDepartamento);
    getDepartamento();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Departamento eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el Departamento:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el Departamento.',
    });
  }
};
