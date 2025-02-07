import Swal from 'sweetalert2'; 
import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } 
from '../../../api/Nucleo/usuario.api.js';
import { createRol,deleteRol } 
from '../../../api/Nucleo/usuario.api.js';

// Función para agregar un nuevo rol
export const addRolFunc = async (nombre, setShowModal, getRoles) => {
  try {
    await createRol(nombre); // Llamada a la API para crear el rol
    getRoles(); // Actualiza la lista de roles
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Rol registrado correctamente',
    });
    setShowModal(false); // Cierra el modal
  } catch (error) {
    console.error('Error al agregar el rol:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el rol.',
    });
  }
};

// Función para eliminar un rol
export const deleteRolFunc = async (idRol, setShowDeleteModal, getRoles) => {
  try {
    await deleteRol(idRol); // Llamada a la API para eliminar el rol
    getRoles(); // Actualiza la lista de roles
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Rol eliminado correctamente',
    });
    setShowDeleteModal(false); // Cierra el modal
  } catch (error) {
    console.error('Error al eliminar el rol:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el rol.',
    });
  }
};


// Obtener todos los usuarios
export const getUsuario = async (setUsuario) => {
  try {
    const data = await getUsuarios();
    setUsuario(data);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
  }
};

// Crear un nuevo usuario
export const addUsuario = async (idPersona, usuario, contrasena, estatus, setShowModal, getUsuario) => {
  try {
    await createUsuario(idPersona, usuario, contrasena, estatus);
    getUsuario();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Usuario registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el usuario.',
    });
  }
};

// Actualizar un usuario existente
export const updateUsuarioFunc = async (idUsuario, idPersona, usuario, contrasena, estatus, setShowEditModal, getUsuario) => {
  try {
    await updateUsuario(idUsuario, idPersona, usuario, contrasena, estatus);
    getUsuario();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Usuario actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el usuario.',
    });
  }
};

// Eliminar un usuario
export const deleteUsuarioFunc = async (idUsuario, setShowDeleteModal, getUsuario) => {
  try {
    await deleteUsuario(idUsuario);
    getUsuario();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Usuario eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el usuario.',
    });
  }
};
