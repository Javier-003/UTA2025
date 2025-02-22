import axios from "axios";
const BASE_URL = "http://localhost:3000";

export const getKardex = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/kardex`);
        return response.data.data; // Retorna los datos de los registros de kardex
    } catch (error) {
        console.error("Error de la api al obtener los registros del kardex:", error);
        throw new Error('Error de la api al obtener los registros del kardex');
    }
};

// Crear un nuevo registro 
export const createKardex = async (idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo) => {
    console.log("Datos que llegan a createKardex:", { idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo });
    if (!idAlumnoPA || !idMapaCurricular || !idGrupo || !idPeriodo || !calificacionFinal || !tipo) {
        throw new Error("Todos los campos son obligatorios para crear un kardex.");
    }

    try {
        await axios.post(`${BASE_URL}/kardex/create`, {
            idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo
        });
    } catch (error) {
        console.error("Error de la API al registrar el kardex:", error);
        throw new Error('Error de la API al registrar el kardex');
    }
};

// Actualizar un registro 
export const updateKardex = async (idKardex, idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo) => {
    try {
        await axios.put(`${BASE_URL}/kardex/update/${idKardex}`, {
            idAlumnoPA, idMapaCurricular, idGrupo, idPeriodo, calificacionFinal, tipo
        });
    } catch (error) {
        console.error("Error de la api al actualizar el kardex:", error);
        throw new Error('Error de la api al actualizar el kardex');
    }
};

// Eliminar un registro de alumno_programa
export const deleteKardex = async (idKardex) => {
    try {
        await axios.delete(`${BASE_URL}/kardex/delete/${idKardex}`);
    } catch (error) {
        console.error("Error de la api al eliminar el kardex:", error);
        throw new Error('Error de la api al eliminar el kardex');
    }
};
