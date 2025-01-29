import { db } from "../../db/connection.js";

// Obtener todos los programas académicos
export const getPrograma_Academicotodos = async (req, res) => {
  try {
    const query = `SELECT pa.*, ne.nombre AS NombreNivelEstudio 
                   FROM programaacademico pa
                   JOIN nivelestudio ne ON pa.id_nivel_estudio = ne.id_nivel_estudio`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Programas académicos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron programas académicos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

//Craar los programas académicos
export const createPrograma_Academico = async (req, res) => {
  try {
    const { id_nivel_estudio,Titulo_Tsu,Titulo_Ing,descripcion,sigla,total_cuatrimestre,desde,hasta,estatus} = req.body;
    if (!id_nivel_estudio || !Titulo_Tsu || !Titulo_Ing || !descripcion || !sigla || !total_cuatrimestre || !desde || !hasta || !estatus) {
      return res.status(400).json({ 
        message: "Todos los campos son requeridos: id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus" });
    }
    const [exists] = await db.query("SELECT 1 FROM programaacademico WHERE Titulo_Tsu = ?", [Titulo_Tsu]);
    if (exists.length) {
      return res.status(400).json({ message: "El título del TSU ya existe" });
    }
    const [result] = await db.query(
      "INSERT INTO programaacademico (id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus]
    );
    res.status(201).json({
      message: `'${Titulo_Tsu}' creado`, id_programa_academico: result.insertId,
      id_nivel_estudio,Titulo_Tsu,Titulo_Ing,descripcion,sigla,total_cuatrimestre,desde,hasta,estatus
    });
  } catch (error) {
    console.error("Error al crear el programa académico:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

//Actualizar los programas académicos
export const updatePrograma_Academico = async (req, res) => {
  try {
    const { id_programa_academico } = req.params;
    const { id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus } = req.body;
    const [exists] = await db.query("SELECT 1 FROM programaacademico WHERE id_programa_academico = ?", [id_programa_academico]);
    if (!exists.length) {
      return res.status(404).json({ message: "El programa académico no existe" });
    }
    const [result] = await db.query(
      "UPDATE programaacademico SET id_nivel_estudio = ?, Titulo_Tsu = ?, Titulo_Ing = ?, descripcion = ?, sigla = ?, total_cuatrimestre = ?, desde = ?, hasta = ?, estatus = ? WHERE id_programa_academico = ?",
      [id_nivel_estudio, Titulo_Tsu, Titulo_Ing, descripcion, sigla, total_cuatrimestre, desde, hasta, estatus, id_programa_academico]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el programa académico" });
    }
    const [nivelEstudio] = await db.query("SELECT nombre FROM nivelestudio WHERE id_nivel_estudio = ?", [id_nivel_estudio]);
    res.status(200).json({
      message: `'${Titulo_Tsu}' actualizado correctamente`,
      id_programa_academico,  id_nivel_estudio, NombreNivelEstudio: nivelEstudio[0].nombre,
      Titulo_Tsu, Titulo_Ing,  descripcion, sigla, total_cuatrimestre,  desde,hasta,estatus
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

//Eliminar los programas académicos
export const deletePrograma_Academico  = async (req, res) => {
  try {
    const { id_programa_academico } = req.params;
    const [programaacademico] = await db.query("SELECT sigla FROM programaacademico WHERE id_programa_academico = ?", [id_programa_academico]);
    if (!programaacademico.length) return res.status(404).json({ message: "Programa academico no encontrada" });
    const [rows] = await db.query("DELETE FROM programaacademico WHERE id_programa_academico = ?", [id_programa_academico]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${programaacademico[0].sigla}' eliminado correctamente` })
      : res.status(404).json({ message: "programa academico no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
