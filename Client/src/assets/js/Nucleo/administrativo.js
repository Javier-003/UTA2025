import Swal from 'sweetalert2'; 
import { createAdministrativo, deleteAdministrativo, getAdministrativos, updateAdministrativo } 
from '../../../api/Nucleo/administrativo.api.js'; 

export const getAdministrativo = async (setAdministrativo) => {
  try {
    const data = await getAdministrativos();
    setAdministrativo(data);
  } catch (error) {
    console.error('Error al obtener las administradores:', error);
  }
};

export const addAdministrativo = async (id_departamento,id_puesto,clave,horario,nss,rfc , setShowModal, getAdministrativo) => {
  try {
    await createAdministrativo(id_departamento,id_puesto,clave,horario,nss,rfc);
    getAdministrativo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Adninistrativo  registrada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el Adninistrativo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el Adninistrativo.',
    });
  }
};

export const updateAdministrativoFunc = async (  id_administrativo , 
    id_departamento,id_puesto,clave,horario,nss,rfc ,setShowEditModal, getAdministrativo) => {
  try {
    await updateAdministrativo( id_administrativo , 
        id_departamento,id_puesto,clave,horario,nss,rfc ,  setShowEditModal, getAdministrativo);
    getAdministrativo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Administrativo actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el Administrativo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el Administrativo.',
    });
  }
};

export const deleteAdministrativoFunc = async (id_administrativo, setShowDeleteModal, getAdministrativo) => {
  try {
    await deleteAdministrativo(id_administrativo);
    getAdministrativo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Administrativo proceso eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el Administrativo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el Administrativo.',
    });
  }
};
