import Swal from 'sweetalert2'; 
import { createRol, deleteRol } from '../../../api/Nucleo/rol.api.js'; 

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
