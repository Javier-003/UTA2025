// src/api/departamento.api.js
import axios from 'axios';

// URL base de la API
const BASE_URL = "http://localhost:3000";

const userSession = localStorage.getItem('Username')

// Obtener todas los departamentos
export const getDepartamentos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/departamento`);
    return response.data.data; // Retorna los datos de las aula
  } catch (error) {
    console.error("Error al obtener las departamentos:", error);
    throw new Error('Error al obtener el departamento');
  }
};

// Crear una nuevo departamento
export const createDepartamento = async (nombre, sigla) => {
  try {
    await axios.post(`${BASE_URL}/departamento/create`, 
        { nombre: nombre , sigla: sigla,userSession  } );
  } catch (error) {
    console.error("Error al registrar la departamento:", error);
    throw new Error('Error al registrar la departamento');
  }
};

// Actualizar una departamento existente
export const updateDepartamento = async (idDepartamento, nombre, sigla) => {
  try {
    await axios.put(`${BASE_URL}/departamento/update/${idDepartamento}`, 
        { nombre: nombre, sigla: sigla,userSession}  );
  } catch (error) {
    console.error("Error al actualizar el departamento:", error);
    throw new Error('Error al actualizar el departamento');
  }
};

// Eliminar un departamento
export const deleteDepartamento = async (idDepartamento) => {
  try {
    const response = await axios.delete(`${BASE_URL}/departamento/delete/${idDepartamento}`, {
      data: { userSession }  // Aquí usamos 'data' para enviar el cuerpo
    });
    if (response.status === 200) {
      console.log("departamento eliminado correctamente:", response.data);
      return response.data; // Retornar los datos de la respuesta si es necesario
    } else {
      throw new Error('No se pudo eliminar el departamento');
    }
  } catch (error) {
    console.error("Error al eliminar el departamento:", error);
    throw new Error('Error al eliminar el departamento');
  }
};

