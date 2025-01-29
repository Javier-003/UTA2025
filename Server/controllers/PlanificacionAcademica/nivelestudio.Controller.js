import { db } from "../../db/connection.js";

export const getnivelestudiotodos = async(req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM nivelestudio");
    if (rows.length > 0) {
      res.json({ message: "Nivel de Estudio obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron nivel de estudio" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createNivelEstudio = async (req, res) => {
    try {
        const { nombre, descripcion, sigla } = req.body;
        // Verifica si el nombre ya existe
        const [exists] = await db.query("SELECT 1 FROM nivelestudio WHERE nombre = ?", [nombre]);
        if (exists.length) return res.status(400).json({ message: "El nombre ya existe" });
        // Inserta los datos del nuevo nivelestudio
        const [rows] = await db.query("INSERT INTO nivelestudio (nombre, descripcion, sigla) VALUES (?, ?, ?)", [nombre, descripcion, sigla]);      
        // Responde con el ID del nuevo registro y los campos nombre y sigla
        res.status(201).json({ 
            message: `'${nombre}' creado`, 
            id_nivel_estudio: rows.insertId, 
            nombre: nombre, 
            descripcion: descripcion,
            sigla: sigla
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error });
    }
};


export const updateNivelEstudio = async (req, res) => {
    try {
        const { id_nivel_estudio } = req.params; // El id se pasa como parámetro en la URL
        const { nombre, descripcion, sigla } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud
        // Verifica si el nivelestudio existe
        const [exists] = await db.query("SELECT 1 FROM nivelestudio WHERE id_nivel_estudio = ?", [id_nivel_estudio]);
        if (!exists.length) return res.status(404).json({ message: "El nivelestudio no existe" });
        // Actualiza los datos del nivelestudio
        const [result] = await db.query("UPDATE nivelestudio SET nombre = ?, descripcion = ?, sigla = ? WHERE id_nivel_estudio = ?", [nombre,descripcion, sigla, id_nivel_estudio]);
        if (result.affectedRows === 0) {
            return res.status(400).json({ message: "No se pudo actualizar el nivelestudio" });
        }
        // Responde con el mensaje de éxito y los nuevos valores
        res.status(200).json({
            message: `'${nombre}' actualizado correctamente`,
            id_nivel_estudio: id_nivel_estudio,
            nombre: nombre, 
            descripcion: descripcion,
            sigla: sigla
        });
    } catch (error) {
        res.status(500).json({ message: "Algo salió mal", error });
    }
};


export const deleteNivelEstudio = async(req, res) => {
    try {
      const {id_nivel_estudio } = req.params;
      const [nivelestudio] = await db.query("SELECT nombre FROM nivelestudio WHERE id_nivel_estudio = ?", [id_nivel_estudio]);
      if (!nivelestudio.length) return res.status(404).json({ message: "Nivel Estudio no encontrado" });
      const [rows] = await db.query("DELETE FROM nivelestudio WHERE id_nivel_estudio = ?", [id_nivel_estudio]);
      rows.affectedRows
        ? res.status(200).json({ message: `'${nivelestudio[0].nombre}' eliminado correctamente` })
        : res.status(404).json({ message: "Nivel Estudio no encontrado" });  
      } catch (error) {
        res.status(500).json({ message: "Algo salió mal" });
      }
};
