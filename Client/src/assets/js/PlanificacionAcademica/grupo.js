import Swal from 'sweetalert2'; 
import { createGrupo, deleteGrupo, getGrupos, updateGrupo } from '../../../api/PlanificacionAcademica/grupo.api.js';

// Obtener todos los grupos
export const getGrupo = async (setGrupo) => {
  try {
    const data = await getGrupos();
    console.log("📡 Datos recibidos en getGrupo:", data);
    if (!Array.isArray(data)) {
      console.error("🚨 Error: La API no devolvió un array, revisa la estructura.");
      return;
    }
    setGrupo(data);
    //console.log("✅ Estado de grupos actualizado:", data);
  } catch (error) {
    console.error("Error al obtener los grupos:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los grupos.",
      icon: "error",
    });
    setGrupo([]);
  }
};

// Crear un grupo
export const addGrupo = async (idPeriodo, idProgramaAcademico, idTutor, 
    nombre, cuatrimestre, observacion, estatus, fecha, setShowModal, fetchGrupo) => {
  try {
    await createGrupo(idPeriodo, idProgramaAcademico, idTutor, nombre, 
        cuatrimestre, observacion, estatus, fecha);
    fetchGrupo(); // Llamar a fetchGrupo para actualizar la lista de grupos
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

// Actualizar un grupo
export const updateGrupoFunc = async (idGrupo, idPeriodo, idProgramaAcademico, idTutor, 
    nombre, cuatrimestre, observacion, estatus, fecha, setShowEditModal, fetchGrupo) => {
  try {
    await updateGrupo(idGrupo, idPeriodo, idProgramaAcademico, idTutor,
         nombre, cuatrimestre, observacion, estatus, fecha);
    fetchGrupo(); // Llamar a fetchGrupo para actualizar la lista de grupos
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

// Eliminar un grupo
export const deleteGrupoFunc = async (idGrupo, setShowDeleteModal, fetchGrupo) => {
  try {
    await deleteGrupo(idGrupo);
    fetchGrupo(); // Llamar a fetchGrupo para actualizar la lista de grupos
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
