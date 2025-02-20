import Swal from 'sweetalert2'; 
import { getCargaMaterias, createCargaMaterias, updateCargaMaterias, deleteCargaMaterias } from '../../../api/PlanificacionAcademica/cargamaterias.api.js'; 

// Obtener todas las cargas de materias
export const getAllCargaMaterias = async () => {
  try {
    const data = await getCargaMaterias();
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error al obtener cargas de materias:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar las cargas de materias.",
      icon: "error",
    });
    return [];
  }
};

// Crear una carga de materias
export const createCargaMateriasForm = async (idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios) => {
  //console.log("Recibiendo datos", idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
  try {
    await createCargaMaterias(idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
    Swal.fire({
      title: "Carga de materias creada",
      text: "La carga de materias se ha creado correctamente.",
      icon: "success",
    });
  } catch (error) {
    console.error("Error al crear carga de materias:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo crear la carga de materias.",
      icon: "error",
    });
  }
};

// Actualizar una carga de materias
export const updateCargaMateriasForm = async (idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios) => {
  console.log("Recibiendo datos", idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
  try {
    await updateCargaMaterias(idGrupoMateria, idGrupo, idProfesor, idMapaCurricular, idAula, tipo, fecha, horarios);
    Swal.fire({
      title: "Carga de materias actualizada",
      text: "La carga de materias se ha actualizado correctamente.",
      icon: "success",
    });
  } catch (error) {
    console.error("Error al actualizar carga de materias:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar la carga de materias.",
      icon: "error",
    });
  }
};

// Eliminar una carga de materias
export const deleteCargaMateriasForm = async (idGrupoMateria) => {
  try {
    await deleteCargaMaterias(idGrupoMateria);
    Swal.fire({
      title: "Carga de materias eliminada",
      text: "La carga de materias se ha eliminado correctamente.",
      icon: "success",
    });
  } catch (error) {
    console.error("Error al eliminar carga de materias:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar la carga de materias.",
      icon: "error",
    });
  }
};