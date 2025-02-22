import Swal from 'sweetalert2'; 
import { getHorario, createHorario, updateHorario, deleteHorario } 
from '../../../api/PlanificacionAcademica/horario.api.js'; 

// Obtener todos los horarios
export const getAllHorario = async () => {
  try {
    const data = await getHorario();
    console.log("Horarios obtenidos en getAllHorario:", data); // <-- Verifica si recibe datos
    if (data.error) throw new Error(data.error);
    return data;
  } catch (error) {
    console.error("Error al obtener horarios:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar los horarios.",
      icon: "error",
    });
    return [];
  }
};

// Crear un horario
export const createHorarioForm = async (horario) => {
  try {
    const response = await createHorario(horario);
    if (response.error) throw new Error(response.error);

    Swal.fire({
      title: "Horario creado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error al crear horario:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo crear el horario.",
      icon: "error",
    });
  }
};

// Actualizar un horario
export const updateHorarioForm = async (idHorario, horario) => {
  try {
    const response = await updateHorario(idHorario, horario);
    if (response.error) throw new Error(response.error);

    Swal.fire({
      title: "Horario actualizado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error al actualizar horario:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo actualizar el horario.",
      icon: "error",
    });
  }
};

// Eliminar un horario con confirmación
export const deleteHorarioForm = async (idHorario) => {
  const confirm = await Swal.fire({
    title: "¿Estás seguro?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar"
  });

  if (!confirm.isConfirmed) return;

  try {
    const response = await deleteHorario(idHorario);
    if (response.error) throw new Error(response.error);

    Swal.fire({
      title: "Horario eliminado",
      icon: "success",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.error("Error al eliminar horario:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar el horario.",
      icon: "error",
    });
  }
};
