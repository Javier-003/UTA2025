import Swal from 'sweetalert2';

import { getOfertaAcademica, createOfertaAcademica, updateOfertaAcademica, deleteOfertaAcademica } 
from "../../../api/PlanificacionAcademica/ofertaacademica.api.js";

export const getOfertaAcademicaFunc = async (setOfertaAcademica) => {
  try {
    const data = await getOfertaAcademica();
    setOfertaAcademica(data);
  } catch (error) {
    console.error('Error al obtener las ofertas academicas:', error);
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema obteniendo las ofertas academicas.',
    });
  }
};

export const addOfertaAcademica = async (nombre, descripcion, sigla, desde, hasta, setShowModal, getOfertaAcademica) => {
    try {
        await createOfertaAcademica(nombre, descripcion, sigla, desde, hasta);
        getOfertaAcademica();
        Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Oferta academica registrada correctamente',
        });
        setShowModal(false);
    } catch (error) {
        console.error('Error al agregar la oferta academica:', error);
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema registrando la oferta academica.',
        });
    }
    };

export const updateOfertaAcademicaFunc = async (idOfertaAcademica, nombre, descripcion, sigla, desde, hasta, setShowEditModal, getOfertaAcademica) => {
    try {
        await updateOfertaAcademica(idOfertaAcademica, nombre, descripcion, sigla, desde, hasta);
        getOfertaAcademica();
        Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Oferta academica actualizada correctamente',
        });
        setShowEditModal(false);
    } catch (error) {
        console.error('Error al actualizar la oferta academica:', error);
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema actualizando la oferta academica.',
        });
    }
    };

export const deleteOfertaAcademicaFunc = async (idOfertaAcademica, getOfertaAcademica) => {
    try {
        await deleteOfertaAcademica(idOfertaAcademica);
        getOfertaAcademica();
        Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Oferta academica eliminada correctamente',
        });
    } catch (error) {
        console.error('Error al eliminar la oferta academica:', error);
        Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema eliminando la oferta academica.',
        });
    }
    }