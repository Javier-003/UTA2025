import { db } from "../../db/connection.js";

export const getEdificiotodos = async(req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM edificio");
    if (rows.length > 0) {
      res.json({ message: "Edificio obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron edificios" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createEdificio = async (req, res) => {
    try {
      const { Nombre, Sigla } = req.body;
      // Verifica si el nombre ya existe
      const [exists] = await db.query("SELECT 1 FROM edificio WHERE Nombre = ?", [Nombre]);
      if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
      // Inserta los datos del nuevo edificio
      const [rows] = await db.query("INSERT INTO edificio (Nombre, Sigla) VALUES (?, ?)", [Nombre, Sigla]);      
      // Responde con el ID del nuevo registro y los campos Nombre y Sigla
      res.status(201).json({ 
        message: `'${Nombre}' creado`, 
        id_edificio: rows.insertId, 
        Nombre: Nombre, 
        Sigla: Sigla
      });
    } catch (error) {
      res.status(500).json({ message: "Algo salió mal", error });
    }
};

export const updateEdificio = async (req, res) => {
    try {
        const { id_edificio } = req.params; // El id se pasa como parámetro en la URL
        const { Nombre, Sigla } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud
        // Verifica si el edificio existe
        const [exists] = await db.query("SELECT 1 FROM edificio WHERE id_edificio = ?", [id_edificio]);
        if (!exists.length) return res.status(404).json({ message: "El edificio no existe" });
        // Actualiza los datos del edificio
        const [result] = await db.query("UPDATE edificio SET Nombre = ?, Sigla = ? WHERE id_edificio = ?", [Nombre, Sigla, id_edificio]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo actualizar el edificio" });
        }
        // Responde con el mensaje de éxito y los nuevos valores
        res.status(200).json({
            message: `'${Nombre}' actualizado correctamente`,
            id_edificio: id_edificio,
            Nombre: Nombre,
            Sigla: Sigla
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error });
    }
};

export const deleteEdificio = async(req, res) => {
  try {
    const {id_edificio } = req.params;
    const [edificio] = await db.query("SELECT Nombre FROM edificio WHERE id_edificio = ?", [id_edificio]);
    if (!edificio.length) return res.status(404).json({ message: "Edificio no encontrado" });
    const [rows] = await db.query("DELETE FROM edificio WHERE id_edificio = ?", [id_edificio]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${edificio[0].Nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Edificio no encontrado" });  
    } catch (error) {
      res.status(500).json({ message: "Algo salió mal" });
    }
};
