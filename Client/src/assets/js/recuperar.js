import Swal from 'sweetalert2';
import { forgotLogin, changePassword } from '../../api/login.api.js';

export const verifyUser = async (usuario) => {
  try {
    const response = await forgotLogin(usuario);
    return response;
  } catch (error) {
    console.error('Error, no se encontró el usuario:', error);
    Swal.fire({
      icon: 'warning',
      title: 'Usuario no encontrado',
      text: error.response?.data?.message || 'Error, usuario no encontrado.',
    });
    return;
  }
};

// Actualizar un usuario existente
export const updatePassword = async (usuario, newPassword, repeatPassword) => {
  try {
    if (!usuario || !newPassword || !repeatPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'Faltan datos',
        text: 'Por favor, asegúrate de que todos los campos estén completos.',
      });
      return;
    }

    if (newPassword !== repeatPassword) {
      Swal.fire({
        icon: 'warning',
        title: 'La contraseña no coincide',
        text: 'Por favor, asegúrate de que las contraseñas coincidan.',
      });
      return;
    }

    await changePassword(usuario, newPassword, repeatPassword);

    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Contraseña actualizada correctamente',
    }).then(() => {
      window.location.href = "/Login"; // Redirigir solo después de que se cierre la alerta
    });

  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.response?.data?.message || 'Hubo un problema actualizando la contraseña.',
    });
    return;
  }
};
