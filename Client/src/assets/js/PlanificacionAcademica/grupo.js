import Swal from 'sweetalert2'; 
import { createGrupo, deleteGrupo, getGrupos, updateGrupo } from '../../../api/PlanificacionAcademica/grupo.api.js';

export const getGrupo = async (setGrupo) => {
  try {
    const data = await getGrupos();
    setGrupo(data);
  } catch (error) {
    console.error('Error al obtener los grupos:', error);
  }
};

export const addGrupo = async (idPeriodo, idProgramaAcademico, idTutor, nombre, 
    cuatrimestre, observacion, estatus, fecha, setShowModal, getGrupo) => {
  try {
    await createGrupo(idPeriodo, idProgramaAcademico, idTutor, nombre, 
        cuatrimestre, observacion, estatus, fecha);
    getGrupo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Grupo registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el grupo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el grupo.',
    });
  }
};

export const updateGrupoFunc = async (idGrupo, idPeriodo, idProgramaAcademico, idTutor, 
    nombre, cuatrimestre, observacion, estatus, fecha, setShowEditModal, getGrupo) => {
  try {
    await updateGrupo(idGrupo, idPeriodo, idProgramaAcademico, idTutor,
         nombre, cuatrimestre, observacion, estatus, fecha);
    getGrupo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Grupo actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el grupo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el grupo.',
    });
  }
};

export const deleteGrupoFunc = async (idGrupo, setShowDeleteModal, getGrupo) => {
  try {
    await deleteGrupo(idGrupo);
    getGrupo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Grupo eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el grupo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el grupo.',
    });
  }
};
