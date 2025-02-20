import Swal from 'sweetalert2';

import { getUsuarios, createUsuario, updateUsuario, deleteUsuario } 
from '../../../api/Nucleo/usuario.api.js';

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
export const addUsuario = async (idPersona, usuario, contrasena, estatus, idRol, setShowModal, getUsuario) => {
  try {

    // Validar que los campos necesarios estén completos
    if (!idPersona || !usuario || !contrasena || !['0', '1'].includes(String(estatus)) || !idRol) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Por favor, asegúrate de que todos los campos estén completos.',
      });
      return;
    }

    // Llamar a la API para crear el usuario
    await createUsuario(idPersona, usuario, contrasena, estatus, idRol);

    // Actualizar la lista de usuarios
    getUsuario();

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Usuario registrado correctamente',
    });

    // Cerrar el modal
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el usuario:', error);

    // Mostrar mensaje de error detallado
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message || 'Hubo un problema registrando el usuario.',
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
