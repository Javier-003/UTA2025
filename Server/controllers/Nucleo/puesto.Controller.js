import { db } from "../../db/connection.js";

export const getPuestotodos = async (req, res) => {
  try {
    const query = `
      SELECT p.id_puesto, p.id_departamento, p.nombre, d.nombre AS nombre_departamento
      FROM puesto p
      JOIN departamento d ON p.id_departamento = d.id_departamento
    `;
    const [rows] = await db.query(query);
    if (rows.length > 0) {
      res.json({ message: "Puestos obtenidos correctamente", data: rows });
    } else {
      res.status(404).json({ message: "No se encontraron puestos" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Algo salió mal" });
  }
};

export const createPuesto = async (req, res) => {
  try {
    const { id_departamento, nombre } = req.body;

    if (!id_departamento || !nombre) {
      return res.status(400).json({ message: "Todos los campos son requeridos: id_departamento, nombre" });
    }

    const [exists] = await db.query("SELECT 1 FROM puesto WHERE nombre = ?", [nombre]);
    if (exists.length) {
      return res.status(400).json({ message: "El nombre del puesto ya existe" });
    }

    const [rows] = await db.query(
      "INSERT INTO puesto (id_departamento, nombre) VALUES (?, ?)",
      [id_departamento, nombre]
    );

    // Obtener el nombre del departamento recién creado
    const [departamento] = await db.query("SELECT nombre FROM departamento WHERE id_departamento = ?", [id_departamento]);

    res.status(201).json({
      message: `'${nombre}' creado`,
      idPuesto: rows.insertId,
      idDepartamento: id_departamento,
      nombreDepartamento: departamento[0].nombre,
      nombre,
    });
  } catch (error) {
    console.error("Error al crear puesto:", error);
    res.status(500).json({ message: "Algo salió mal", error: error.message });
  }
};

export const updatePuesto = async (req, res) => {
  try {
    const { id_puesto } = req.params;
    const { id_departamento, nombre } = req.body;

    const [exists] = await db.query("SELECT 1 FROM puesto WHERE id_puesto = ?", [id_puesto]);
    if (!exists.length) {
      return res.status(404).json({ message: "El puesto no existe" });
    }

    const [result] = await db.query(
      "UPDATE puesto SET id_departamento = ?, nombre = ? WHERE id_puesto = ?",
      [id_departamento, nombre, id_puesto]
    );

    if (result.affectedRows === 0) {
      return res.status(400).json({ message: "No se pudo actualizar el puesto" });
    }

    const [departamento] = await db.query("SELECT nombre FROM departamento WHERE id_departamento = ?", [id_departamento]);

    res.status(200).json({
      message: `'${nombre}' actualizado correctamente`,
      idPuesto: id_puesto,
      idDepartamento: id_departamento,
      nombreDepartamento: departamento[0].nombre,
      nombre
    });
  } catch (error) {
    res.status(500).json({ message: "Algo salió mal", error });
  }
};


export const deletePuesto = async(req, res) => {
    try {
      const {id_puesto } = req.params;
      const [puesto] = await db.query("SELECT nombre FROM puesto WHERE id_puesto = ?", [id_puesto]);
      if (!puesto.length) return res.status(404).json({ message: "Puesto no encontrado" });
      const [rows] = await db.query("DELETE FROM puesto WHERE id_puesto = ?", [id_puesto]);
      rows.affectedRows
        ? res.status(200).json({ message: `'${puesto[0].nombre}' eliminado correctamente` })
        : res.status(404).json({ message: "Puesto no encontrado" });  
    } catch (error) {
      res.status(500).json({ message: "Algo salió mal" });
  }
};
  