import Swal from 'sweetalert2'; 

import { createMapaCurricular, deleteMapaCurricular, getMapaCurriculares, updateMapaCurricular } 
from '../../../api/PlanificacionAcademica/mapacurricular.api.js';

export const getMapaCurricular = async (setMapaCurriccular) => {
  try {
    const data = await getMapaCurriculares();
    setMapaCurriccular(data);
  } catch (error) {
    console.error('Error al obtener mapas curriculares:', error);
  }
};

export const addMapaCurricular = async (id_programa_academico,ciclo,cuatrimestre,materia, clave,
    h_semana,h_teoricas,h_practicas,h_total,creditos,modalidad,espacio, setShowModal, getMapaCurricular) => {
  try {
    await createMapaCurricular(id_programa_academico,ciclo,cuatrimestre,materia, clave,
        h_semana,h_teoricas,h_practicas,h_total,creditos,modalidad,espacio);
    getMapaCurricular();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Mapa Curricular registrada correctamente',
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

export const updateMapaCurricularFunc = async (
    id_mapa_curricular,id_programa_academico,ciclo,cuatrimestre,
    materia, clave,h_semana,h_teoricas,h_practicas,h_total,creditos,
    modalidad,espacio, setShowEditModal, getMapaCurricular) => {
  try {
    await updateMapaCurricular(id_mapa_curricular, 
        id_programa_academico,ciclo,cuatrimestre,materia, clave,h_semana,
        h_teoricas,h_practicas,h_total,creditos,modalidad,espacio);
    getMapaCurricular();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Mapa Curricular actualizada correctamente',
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

export const deleteMapaCurricularFunc = async (id_mapa_curricular, setShowDeleteModal, getMapaCurricular) => {
  try {
    await deleteMapaCurricular(id_mapa_curricular);
    getMapaCurricular();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Mapa Curricular eliminada correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el Mapa Curricular:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el Mapa Curricular.',
    });
  }
};
