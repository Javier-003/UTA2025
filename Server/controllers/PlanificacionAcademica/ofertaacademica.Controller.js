import { db } from "../../db/connection.js"; // Importar la conexión a la base de datos

// Helper: un campo "falta" solo si viene undefined, null o cadena vacia.
// OJO: no se usa !valor porque eso tambien rechaza el 0, que puede ser valido.
const falta = (v) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");

// Helper: convierte "" a null para columnas opcionales.
// Importante en columnas DATE: MySQL rechaza "" con "Incorrect date value".
const opcional = (v) => (falta(v) ? null : v);

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
        const { nombre, descripcion, sigla, desde, hasta } = req.body;

        // Solo 'nombre' y 'desde' son NOT NULL en la BD.
        // 'descripcion', 'sigla' y 'hasta' aceptan NULL: no deben ser obligatorios.
        const faltantes = [];
        if (falta(nombre)) faltantes.push("nombre");
        if (falta(desde)) faltantes.push("desde");
        if (faltantes.length > 0) {
            return res.status(400).json({
                message: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`
            });
        }

        // Insertar oferta academica en la base de datos
        const [rows] = await db.query(
            "INSERT INTO ofertaacademica (nombre, descripcion, sigla, desde, hasta) VALUES (?, ?, ?, ?, ?)",
            [nombre, opcional(descripcion), opcional(sigla), desde, opcional(hasta)]
        );
        // Responder con la oferta academica creada
        res.status(201).json({
            message: `'${nombre}' creado`,
            idOfertaAcademica: rows.insertId,
            nombre,
            descripcion: opcional(descripcion),
            sigla: opcional(sigla),
            desde,
            hasta: opcional(hasta)
        });
    } catch (error) {
        console.error("Error al crear la oferta academica:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
    }
};

export const updateOfertaAcademica = async (req, res) => {
    try {
        const { idOfertaAcademica } = req.params; // El id se pasa como parámetro en la URL
        const { nombre, descripcion, sigla, desde, hasta } = req.body; // Los datos a actualizar se pasan en el cuerpo de la solicitud

        // Solo 'nombre' y 'desde' son obligatorios (ver nota en create)
        const faltantes = [];
        if (falta(nombre)) faltantes.push("nombre");
        if (falta(desde)) faltantes.push("desde");
        if (faltantes.length > 0) {
            return res.status(400).json({
                message: `Faltan los siguientes campos obligatorios: ${faltantes.join(", ")}`
            });
        }

        // Actualizar oferta academica en la base de datos
        const [result] = await db.query(
            "UPDATE ofertaacademica SET nombre = ?, descripcion = ?, sigla = ?, desde = ?, hasta = ? WHERE idOfertaAcademica = ?",
            [nombre, opcional(descripcion), opcional(sigla), desde, opcional(hasta), idOfertaAcademica]
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
