import { db } from "../../db/connection.js";

export const getTramitetodos = async(req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM tramite");
        if (rows.length > 0) {
            res.json({ message: "Tramites obtenidos correctamente", data: rows });
        } else {
            res.status(404).json({ message: "No se encontraron Tramites" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Algo salió mal" });
    }
};

export const createTramite = async (req, res) => {
    try {
        const { nombre, desde, hasta } = req.body;
        // Verifica si el nombre ya existe
        const [exists] = await db.query("SELECT 1 FROM tramite WHERE nombre = ?", [nombre]);
        if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
        
        // Inserta los datos del nuevo tramite
        const [rows] = await db.query("INSERT INTO tramite (nombre, desde, hasta) VALUES (?, ?, ?)", [nombre, desde, hasta || null]);      
        
        // Responde con el ID del nuevo registro y los campos Nombre, Desde y Hasta
        res.status(201).json({ 
            message: `'${nombre}' creado`, 
            idTramite: rows.insertId, 
            nombre: nombre, 
            desde: desde, 
            hasta: hasta || null
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error });
    }
};

export const updateTramite = async (req, res) => {
    try {
        const { idTramite } = req.params; // El id se pasa como parámetro en la URL
        const { nombre, desde, hasta } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud
        
        // Verifica si el tramite existe
        const [exists] = await db.query("SELECT 1 FROM tramite WHERE idTramite = ?", [idTramite]);
        if (!exists.length) return res.status(404).json({ message: "El tramite no existe" });
        
        // Actualiza los datos del tramite
        const [result] = await db.query("UPDATE tramite SET nombre = ?, desde = ?, hasta = ? WHERE idTramite = ?", [nombre, desde, hasta || null, idTramite]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo actualizar el tramite" });
        }
        
        // Responde con el mensaje de éxito y los nuevos valores
        res.status(200).json({
            message: `'${nombre}' actualizado correctamente`,
            idTramite: idTramite,
            nombre: nombre,
            desde: desde,
            hasta: hasta || null
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error });
    }
};


export const deleteTramite = async(req, res) => {
    try {
      const {idTramite } = req.params;
      const [tramite] = await db.query("SELECT nombre FROM tramite WHERE idTramite = ?", [idTramite]);
      if (!tramite.length) return res.status(404).json({ message: "Tramite no encontrado" });
      const [rows] = await db.query("DELETE FROM tramite WHERE idTramite = ?", [idTramite]);
      rows.affectedRows
        ? res.status(200).json({ message: `'${tramite[0].nombre}' eliminado correctamente` })
        : res.status(404).json({ message: "Tramite no encontrado" });  
      } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
    }
};
