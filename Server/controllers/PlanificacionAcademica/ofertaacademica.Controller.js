import { db } from "../../db/connection.js"; // Importar la conexión a la base de datos

// obtener las ofertas academicas
export const getOfertaAcademicaTodos = async (req, res) => { 
    try {
        const query = `
            SELECT oa.idOfertaAcademica, oa.nombre, oa.descripcion, oa.sigla, oa.desde, oa.hasta
            FROM ofertaacademica oa
            ORDER BY oa.idOfertaAcademica;
        `;
        const [rows] = await db.query(query);
        if (rows.length > 0) {
            res.json({
                message: "Ofertas academicas obtenidas correctamente",
                data: rows
            });
        } else {
            res.status(404).json({ message: "No se encontraron ofertas academicas" });
        }
    }
    catch (error) {
        console.error("Error al obtener las ofertas academicas:", error);
        res.status(500).json({
            message: "Algo salió mal al obtener las ofertas academicas",
            error: error.message
        });
    }
};


export const createOfertaAcademica = async (req, res) => {
    try {
        const { nombre, descripcion = null, sigla, desde, hasta = null } = req.body;
        // Verificación de campos requeridos
        if (!nombre || !sigla || !desde) {
            return res.status(400).json({ message: "Los campos nombre, sigla y desde son requeridos." });
        }
        // Insertar oferta academica en la base de datos
        const [rows] = await db.query(
            "INSERT INTO ofertaacademica (nombre, descripcion, sigla, desde, hasta) VALUES (?, ?, ?, ?, ?)",
            [nombre, descripcion, sigla, desde, hasta]
        );
        // Responder con la oferta academica creada
        res.status(201).json({
            message: `'${nombre}' creado`,
            idOfertaAcademica: rows.insertId,
            nombre,
            descripcion,
            sigla,
            desde,
            hasta
        });
    } catch (error) {
        console.error("Error al crear la oferta academica:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};


export const updateOfertaAcademica = async (req, res) => {
    try {
        const { idOfertaAcademica } = req.params; // El id se pasa como parámetro en la URL
        const { nombre, descripcion = null, sigla, desde, hasta = null } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud
        // Verificación de campos requeridos
        if (!nombre || !sigla || !desde) {
            return res.status(400).json({ message: "Los campos nombre, sigla y desde son requeridos." });
        }
        // Actualizar oferta academica en la base de datos
        const [result] = await db.query(
            "UPDATE ofertaacademica SET nombre = ?, descripcion = ?, sigla = ?, desde = ?, hasta = ? WHERE idOfertaAcademica = ?",
            [nombre, descripcion, sigla, desde, hasta, idOfertaAcademica]
        );
        if (result.affectedRows > 0) {
            res.json({ message: "Oferta academica actualizada correctamente" });
        } else {
            res.status(404).json({ message: `No se encontró la oferta academica con id ${idOfertaAcademica}` });
        }
    } catch (error) {
        console.error("Error al actualizar la oferta academica:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};


export const deleteOfertaAcademica = async (req, res) => {
    try {
        const { idOfertaAcademica } = req.params; // El id se pasa como parámetro en la URL
        // Eliminar oferta academica de la base de datos
        const [result] = await db.query("DELETE FROM ofertaacademica WHERE idOfertaAcademica = ?", [idOfertaAcademica]);
        if (result.affectedRows > 0) {
            res.json({ message: "Oferta academica eliminada correctamente" });
        } else {
            res.status(404).json({ message: `No se encontró la oferta academica con id ${idOfertaAcademica}` });
        }
    } catch (error) {
        console.error("Error al eliminar la oferta academica:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
}
