import Swal from 'sweetalert2';
import { agregarRolUsuario, eliminarRolUsuario } from '../../../api/Nucleo/rol.api.js';

// Función para agregar un nuevo rol a un usuario
export const addRolUsuarioFunc = async (idUsuario, idRol, setShowModal, getRoles) => {
  try {
    await agregarRolUsuario(idUsuario, idRol); // Llamada a la API para agregar el rol al usuario
    getRoles(); // Actualiza la lista de roles
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Rol agregado al usuario correctamente',
    });
    setShowModal(false); // Cierra el modal
  } catch (error) {
    console.error('Error al agregar el rol al usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema agregando el rol al usuario.',
    });
  }
};

// Función para eliminar un rol de un usuario
export const deleteRolUsuarioFunc = async (idUsuario, idRol, setShowDeleteModal, getRoles) => {
  try {
    await eliminarRolUsuario(idUsuario, idRol); // Llamada a la API para eliminar el rol del usuario
    getRoles(); // Actualiza la lista de roles
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Rol eliminado del usuario correctamente',
    });
    setShowDeleteModal(false); // Cierra el modal
  } catch (error) {
    console.error('Error al eliminar el rol del usuario:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el rol del usuario.',
    });
  }
};
