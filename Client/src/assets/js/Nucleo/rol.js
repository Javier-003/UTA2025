import Swal from 'sweetalert2'; 
import { createRol, deleteRol } from '../../../api/Nucleo/rol.api.js'; 

// Función para agregar rol a un usuario
export const addRolFunc = async (id_usuario, id_rol, setShowModal, getRoles) => {
  try {
    await createRol(id_usuario, id_rol); // Llamada a la API para crear el rol
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

// Función para eliminar rol de un usuario
export const deleteRolFunc = async (id_usuario, id_rol, setShowDeleteModal, getRoles) => {
  try {
    await deleteRol(id_usuario, id_rol); // Llamada a la API para eliminar el rol
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
