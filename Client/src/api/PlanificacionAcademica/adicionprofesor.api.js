import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";
axios.defaults.withCredentials = true;
// Obtener todos los profesores con su información de persona
export const getAdicionProfesoresTodos = async () => {
  try {
    //const response = await axios.get(`${BASE_URL}/api/profesor`);
    const response = await axios.get(`http://localhost:3000/adicionprofesor`);
    console.log("🔍 Respuesta completa de la API:", response);

    // Verifica qué datos estás recibiendo antes de retornarlos
    if (!response.data || typeof response.data !== "object") {
      console.error("⚠️ La API no devolvió datos válidos:", response.data);
      return [];
    }

    return response.data;
  } catch (error) {
    console.error("❌ Error al obtener los adicionprofesores:", error);
    return [];
  }
};

// Crear un nuevo profesor 
export const createAdicionProfesor = async (nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    await axios.post(`http://localhost:3000/adicionprofesor/create` , { 
      nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
  } catch (error) {
    console.error("Error al registrar el profesor:", error);
    throw new Error('Error al registrar el profesor');
  }
};

// Actualizar un profesor existente
export const updateAdicionProfesor = async (idProfesor, idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc) => {
  try {
    console.log("Enviando actualización con ID:", idProfesor); // Debug
    await axios.put(`http://localhost:3000/adicionprofesor/update/${idProfesor}`, { 
      idPersona, nombre, paterno, materno, nacimiento, curp, genero, direccion, telefono, idDepartamento, idPuesto, clave, perfil, email, noCedula, programaAcademicos, nss, rfc
    });
    console.log("Profesor actualizado correctamente.");
  } catch (error) {
    console.error("Error al actualizar el profesor:", error);
    throw new Error('Error al actualizar el profesor');
  }
};


// Eliminar un profesor
// Eliminar un profesor
export const deleteAdicionProfesor = async (idProfesor) => {
  try {
    console.log("📌 Eliminando profesor con ID:", idProfesor);
    await axios.delete(`http://localhost:3000/adicionprofesor/delete/${idProfesor}`);
    console.log("✅ Profesor eliminado correctamente.");
  } catch (error) {
    console.error("❌ Error al eliminar el profesor:", error);
    throw new Error("Error al eliminar el profesor");
  }
};
