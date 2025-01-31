import Swal from 'sweetalert2';
import { createAdministrativo, deleteAdministrativo, getAdministrativos, updateAdministrativo } from '../../../api/Nucleo/administrativo.api.js';

export const getAdministrativo = async (setAdministrativo) => {
  try {
    const data = await getAdministrativos();
    setAdministrativo(data);
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
  }
};

export const addAdministrativo = async (idDepartamento, idPuesto, clave, horario, nss, rfc, setShowModal, getAdministrativo) => {
  try {
    await createAdministrativo(idDepartamento, idPuesto, clave, horario, nss, rfc);
    getAdministrativo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Administrativo registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el administrativo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el administrativo.',
    });
  }
};

export const updateAdministrativoFunc = async (idAdministrativo, idDepartamento, idPuesto, clave, horario, nss, rfc, setShowEditModal, getAdministrativo) => {
  try {
    await updateAdministrativo(idAdministrativo, idDepartamento, idPuesto, clave, horario, nss, rfc);
    getAdministrativo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Administrativo actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el administrativo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el administrativo.',
    });
  }
};

export const deleteAdministrativoFunc = async (idAdministrativo, setShowDeleteModal, getAdministrativo) => {
  try {
    await deleteAdministrativo(idAdministrativo);
    getAdministrativo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Administrativo eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el administrativo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el administrativo.',
    });
  }
};
