import Swal from 'sweetalert2'; 

import { createPersona, deletePersona, getPersonas,updatePersona, } 
from '../../../api/Nucleo/persona.api.js'; 

export const getPersona = async (setPersona) => {
  try {
    const data = await getPersonas();
    setPersona(data);
  } catch (error) {
    console.error('Error al obtener las aulas:', error);
  }
};

export const addPersona = async (nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento, setShowModal,getPersona) => {
    try {
      await createPersona(nombre, apellido_paterno, apellido_materno, genero, direccion, telefono, curp, fecha_nacimiento);
      getPersona();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Persona registrada correctamente',
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error al agregar la persona:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema registrando la persona .',
      });
    }
};

export const updatePersonaFunc = async (
   id_persona, nombre, apellido_paterno, apellido_materno,
   genero, direccion, telefono, curp, fecha_nacimiento, 
   setShowEditModal, getPersona) => {
    try {
      await updatePersona(
        id_persona, nombre, apellido_paterno,apellido_materno, 
        genero, direccion, telefono, curp, fecha_nacimiento);
      getPersona();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Persona actualizada correctamente',
      });
      setShowEditModal(false);
    } catch (error) {
      console.error('Error al actualizar la persona:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema actualizando la persona.',
      });
    }
};

export const deletePersonaFunc = async (id_persona, setShowDeleteModal, getPersona) => {
    try {
      await deletePersona(id_persona);
      getPersona();
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Persona eliminada correctamente',
      });
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error al eliminar la persona:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema eliminando la persona.',
      });
    }
};
