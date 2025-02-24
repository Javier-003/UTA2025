import Swal from 'sweetalert2'; //Act. 

import { createPersona, deletePersona, getPersonas, updatePersona } 
from '../../../api/Nucleo/persona.api.js'; 

export const getPersona = async (setPersona) => {
  try {
    const data = await getPersonas();
    setPersona(data);
  } catch (error) {
    console.error('Error al obtener las personas:', error);
  }
};

export const addPersona = async (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, setShowModal, getPersona) => {
  console.log("Datos enviados al js:", {
    nombre,
    paterno,
    materno,
    nacimiento,
    curp,
    genero,
    direccion,
    telefono,
  });
  try {
    await createPersona(nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono);
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
      text: 'Hubo un problema registrando la persona.',
    });
  }
};

export const updatePersonaFunc = async (
  idPersona, nombre, paterno, materno,
  genero, direccion, telefono, curp, nacimiento,
  setShowEditModal, getPersona
) => {
  try {
    await updatePersona(
      idPersona, nombre, paterno, materno, 
      genero, direccion, telefono, curp, nacimiento
    );
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

export const deletePersonaFunc = async (idPersona, setShowDeleteModal, getPersona) => {
  try {
    await deletePersona(idPersona);
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
