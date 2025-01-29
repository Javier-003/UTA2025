import Swal from 'sweetalert2'; 

import {getCargaMaterias, createCargaMaterias, updateCargaMaterias, deleteCargaMaterias} 
from '../../../api/PlanificacionAcademica/cargamaterias.api.js'; 

export const getCargaMateriasjs = async (setCargaMateriasjs) => {
  try {
    const data = await getCargaMaterias();
    setCargaMateriasjs(data);
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
};

export const addCargaMaterias = async (id_grupo, idMapaCurricular, tipo, fecha, idProfesor, setShowModal, getCargaMateriasjs) => {
  try {
    await createCargaMaterias(id_grupo, idMapaCurricular, tipo, fecha, idProfesor);
    getCargaMateriasjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia asociada correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al asociar una materia:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema asociando la materia.',
    });
  }
};

export const updateCargaMateriasjs = async (id_grupo_materia, id_grupo, idMapaCurricular, tipo, idProfesor, setShowEditModal, getCargaMateriasjs) => {
  try {
    await updateCargaMaterias(id_grupo_materia, id_grupo, idMapaCurricular, tipo, idProfesor);
    getCargaMateriasjs();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia asociada actualizada correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar los datos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando los datos.',
    });
  }
};

export const deleteCargaMateriasjs = async (id_grupo_materia, setShowDeleteModal, getEdificio) => {
  try {
    await deleteCargaMaterias(id_grupo_materia);
    getEdificio();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Materia eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar la materia:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando la materia.',
    });
  }
};
