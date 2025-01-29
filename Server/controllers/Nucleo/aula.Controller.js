import { db } from "../../db/connection.js";

export const getAulatodos = async (req, res) => {
  try {
    const query = `SELECT a.*, e.Nombre AS NombreEdificio 
    FROM aula a
    JOIN edificio e ON a.IdEdificio = e.id_edificio`;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Aulas obtenidas correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron aulas" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createAula = async (req, res) => {
  try {
    const { IdEdificio, AulaTipo, Nombre, SIGLA } = req.body;
    if (!IdEdificio || !AulaTipo || !Nombre || !SIGLA) {
      return res.status(400).json({ message: "Todos los campos son requeridos: IdEdificio, AulaTipo, Nombre, SIGLA" });
    }
    const [exists] = await db.query("SELECT 1 FROM aula WHERE Nombre = ?", [Nombre]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del aula ya existe" });
    }
    const [rows] = await db.query( "INSERT INTO aula (IdEdificio, AulaTipo, Nombre, SIGLA) VALUES (?, ?, ?, ?)",
      [IdEdificio, AulaTipo, Nombre, SIGLA]
    )
    // Obtener el nombre del edificio recién creado
    const [edificio] = await db.query("SELECT Nombre FROM edificio WHERE id_edificio = ?", [IdEdificio]);
    res.status(201).json({
      message: `'${Nombre}' creado`,
      IdAula: rows.insertId,
      IdEdificio,NombreEdificio: edificio[0].Nombre,AulaTipo,Nombre,SIGLA
    });
  } catch (error) {
    console.error("Error al crear aula:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updateAula = async (req, res) => {
  try {
    const { IdAula } = req.params;
    const { IdEdificio, AulaTipo, Nombre, SIGLA } = req.body;
    const [exists] = await db.query("SELECT 1 FROM aula WHERE IdAula = ?", [IdAula]);
    if (!exists.length) {
      return res.status(404).json({ message: "El Aula no existe" });
    }
    const [result] = await db.query("UPDATE aula SET AulaTipo = ?, Nombre = ?, SIGLA = ?, IdEdificio = ? WHERE IdAula = ?",
      [AulaTipo, Nombre, SIGLA, IdEdificio, IdAula]
    );
    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el aula" });
    }
    const [edificio] = await db.query("SELECT Nombre FROM edificio WHERE id_edificio = ?", [IdEdificio]);
    res.status(200).json({
      message: `'${Nombre}' actualizado correctamente`,
      IdAula,IdEdificio,NombreEdificio: edificio[0].Nombre,AulaTipo,Nombre,SIGLA
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error });
  }
};

export const deleteAula = async (req, res) => {
  try {
    const { IdAula } = req.params;
    const [aula] = await db.query("SELECT Nombre FROM aula WHERE IdAula = ?", [IdAula]);
    if (!aula.length) return res.status(404).json({ message: "Aula no encontrada" });
    const [rows] = await db.query("DELETE FROM aula WHERE IdAula = ?", [IdAula]);
    rows.affectedRows
      ? res.status(200).json({ message: `'${aula[0].Nombre}' eliminado correctamente` })
      : res.status(404).json({ message: "Aula no encontrada" });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal" });
  }
};
