import { db } from "../../db/connection.js";

export const getDepartamentotodos = async(req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM departamento");
    if (rows.length > 0) {
      res.json({ message: "Departamento obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron departamento" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createDepartamento = async (req, res) => {
    try {
      const { Nombre, Sigla } = req.body;
      // Verifica si el nombre ya existe
      const [exists] = await db.query("SELECT 1 FROM departamento WHERE Nombre = ?", [Nombre]);
      if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
      // Inserta los datos del nuevo departamento
      const [rows] = await db.query("INSERT INTO departamento (Nombre, Sigla) VALUES (?, ?)", [Nombre, Sigla]);      
      // Responde con el ID del nuevo registro y los campos Nombre y Sigla
      res.status(201).json({ 
        message: `'${Nombre}' creado`, 
        id_departamento: rows.insertId, 
        Nombre: Nombre, 
        Sigla: Sigla
      });
    } catch (error) {
      res.status(500).json({ message: "Algo salió mal", error });
    }
};

export const updateDepartamento = async (req, res) => {
    try {
        const { id_departamento } = req.params; // El id se pasa como parámetro en la URL
        const { Nombre, Sigla } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud
        // Verifica si el departamento existe
        const [exists] = await db.query("SELECT 1 FROM departamento WHERE id_departamento = ?", [id_departamento]);
        if (!exists.length) return res.status(404).json({ message: "El departamento no existe" });
        // Actualiza los datos del departamento
        const [result] = await db.query("UPDATE departamento SET Nombre = ?, Sigla = ? WHERE id_departamento = ?", [Nombre, Sigla, id_departamento]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo actualizar el departamento" });
        }
        // Responde con el mensaje de éxito y los nuevos valores
        res.status(200).json({
            message: `'${Nombre}' actualizado correctamente`,
            id_departamento: id_departamento,
            Nombre: Nombre,
            Sigla: Sigla
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error });
    }
};

export const deleteDepartamento = async(req, res) => {
  try {
    const {id_departamento } = req.params;
    const [departamento] = await db.query("SELECT Nombre FROM departamento WHERE id_departamento = ?", [id_departamento]);
    if (!departamento.length) return res.status(404).json({ message: "Departamento no encontrado" });
    const [rows] = await db.query("DELETE FROM departamento WHERE id_departamento = ?", [id_departamento]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${departamento[0].Nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Departamento no encontrado" });  
    } catch (error) {
      res.status(500).json({ message: "Algo salió mal" });
    }
};
