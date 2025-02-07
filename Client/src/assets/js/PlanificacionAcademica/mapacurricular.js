import Swal from 'sweetalert2'; 

import { createMapaCurricular, deleteMapaCurricular, getMapaCurriculares, updateMapaCurricular } 
from '../../../api/PlanificacionAcademica/mapacurricular.api.js';

export const getMapaCurricular = async (setMapaCurricular) => {
  try {
    const data = await getMapaCurriculares();
    setMapaCurricular(data);
  } catch (error) {
    console.error('Error al obtener mapas curriculares:', error);
  }
};

export const addMapaCurricular = async (idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, setShowModal, getMapaCurricular) => {
  try {
    await createMapaCurricular(idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad);
    getMapaCurricular();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Mapa Curricular registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el Mapa Curricular:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el Mapa Curricular.',
    });
  }
};

export const editMapaCurricular = async (idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad, setShowEditModal, getMapaCurricular) => {
  try {
    await updateMapaCurricular(idMapaCurricular, idProgramaAcademico, ciclo, cuatrimestre, materia, clave, horasSemana, horasTeoricas, horasPracticas, horasTotal, creditos, modalidad, espacio, noUnidad);
    getMapaCurricular();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Mapa Curricular actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el Mapa Curricular:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el Mapa Curricular.',
    });
  }
};

export const removeMapaCurricular = async (idMapaCurricular, getMapaCurricular) => {
  try {
    await deleteMapaCurricular(idMapaCurricular);
    getMapaCurricular();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Mapa Curricular eliminado correctamente',
    });
  } catch (error) {
    console.error('Error al eliminar el Mapa Curricular:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el Mapa Curricular.',
    });
  }
};