import Swal from 'sweetalert2';
import { agregarRolUsuario, eliminarRolUsuario } from '../../../api/Nucleo/rol.api.js';

// Función para mostrar un mensaje con SweetAlert
const mostrarAlerta = (icono, titulo, mensaje) => {
  Swal.fire({
    icon: icono,
    title: titulo,
    text: mensaje,
  });
};

// Función para agregar un nuevo rol a un usuario
export const addRolUsuarioFunc = async (idUsuario, idRol, setShowModal, getRoles) => {
  try {
    await agregarRolUsuario(idUsuario, idRol); // Llamada a la API para agregar el rol al usuario

    getRoles(); // Actualiza el estado de roles con el nuevo rol agregado

    mostrarAlerta('success', '¡Éxito!', 'Rol agregado al usuario correctamente');
    setShowModal(false); // Cierra el modal
  } catch (error) {
    console.error('Error al agregar el rol al usuario:', error);
    const errorMessage = error.response ? error.response.data.message : 'Error desconocido'; // Accede al mensaje de error
    mostrarAlerta('error', 'Error', errorMessage || 'Hubo un problema agregando el rol al usuario.');
  }
};

// Función para eliminar un rol de un usuario
export const deleteRolUsuarioFunc = async (idUsuario, idRol, setShowDeleteModal, getRoles) => {
  try {
    const response = await eliminarRolUsuario(idUsuario, idRol); // Llamada a la API para eliminar el rol del usuario

    getRoles(response); // Actualiza el estado de roles con el rol eliminado

    mostrarAlerta('success', '¡Éxito!', 'Rol eliminado del usuario correctamente');
    setShowDeleteModal(false); // Cierra el modal
  } catch (error) {
    console.error('Error al eliminar el rol del usuario:', error);
    const errorMessage = error.response ? error.response.data.message : 'Error desconocido'; // Accede al mensaje de error
    mostrarAlerta('error', 'Error', errorMessage || 'Hubo un problema eliminando el rol del usuario.');
  }
};