import Swal from 'sweetalert2'; 
import { getAdicionProfesoresTodos, createAdicionProfesor, updateAdicionProfesor, deleteAdicionProfesor } 
from '../../../api/PlanificacionAcademica/adicionprofesor.api.js';

// Obtener todos los profesores
export const getAllAdicionProfesor = async () => {
  try {
    const data = await getAdicionProfesoresTodos();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error al obtener profesores:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los profesores.",
      icon: "error",
    });
    return [];
  }
};

// Crear un profesor
export const createNewAdicionProfesor = async (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await createAdicionProfesor(nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc);
    Swal.fire({
      title: "Profesor añadido",
      text: "El profesor se ha añadido correctamente.",
      icon: "success",
    });
  } catch (error) {
    console.error("Error al añadir profesor:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo añadir el profesor.",
      icon: "error",
    });
  }
};

// Actualizar un profesor
export const updateExistingAdicionProfesor = async (idProfesor, idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await updateAdicionProfesor(idProfesor, idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc);
    Swal.fire({
      title: "Profesor actualizado",
      text: "El profesor se ha actualizado correctamente.",
      icon: "success",
    });
  } catch (error) {
    console.error("Error al actualizar profesor:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar el profesor.",
      icon: "error",
    });
  }
};

// Eliminar un profesor
export const deleteExistingAdicionProfesor = async (idProfesor) => {
  console.log("ID recibido en el frontend para eliminar:", idProfesor); 

  try {
    await deleteAdicionProfesor(idProfesor);
    Swal.fire({
      title: "Profesor eliminado",
      text: "El profesor se ha eliminado correctamente.",
      icon: "success",
    });
  } catch (error) {
    console.error("Error al eliminar profesor:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar el profesor.",
      icon: "error",
    });
  }
};

