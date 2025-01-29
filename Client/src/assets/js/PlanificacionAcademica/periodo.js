import Swal from 'sweetalert2';

import { getPeriodos, createPeriodo, updatePeriodo, deletePeriodo } 
from "../../../api/PlanificacionAcademica/periodo.api.js";

export const getPeriodo = async (setPeriodo) => {
  try {
    const data = await getPeriodos();
    setPeriodo(data);
  } catch (error) {
    console.error('Error al obtener los periodos:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema obteniendo los periodos.',
    });
  }
};

export const addPeriodo = async (periodo, fecha_inicio, fecha_fin, estado,fecha_registro, setShowModal, getPeriodo) => {
  try {
    await createPeriodo(periodo, fecha_inicio, fecha_fin, estado, fecha_registro);
    getPeriodo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Periodo registrado correctamente',
    });
    setShowModal(false);
  } catch (error) {
    console.error('Error al agregar el periodo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema registrando el periodo.',
    });
  }
};

export const updatePeriodoFunc = async (id_periodo, periodo, fecha_inicio, fecha_fin, estado, setShowEditModal, getPeriodo) => {
  try {
    await updatePeriodo(id_periodo, periodo, fecha_inicio, fecha_fin, estado);
    getPeriodo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Periodo actualizado correctamente',
    });
    setShowEditModal(false);
  } catch (error) {
    console.error('Error al actualizar el periodo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema actualizando el periodo.',
    });
  }
};

export const deletePeriodoFunc = async (id_periodo, setShowDeleteModal, getPeriodo) => {
  try {
    await deletePeriodo(id_periodo);
    getPeriodo();
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: 'Periodo eliminado correctamente',
    });
    setShowDeleteModal(false);
  } catch (error) {
    console.error('Error al eliminar el periodo:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema eliminando el periodo.',
    });
  }
};
