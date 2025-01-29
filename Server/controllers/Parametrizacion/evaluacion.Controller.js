import { db } from "../../db/connection.js";

export const getEvaluacion = async (req, res) => {
    try {
      const query = `
        SELECT e.*, 
        mp.materia AS mapa,
         CONCAT(mu.Unidad, ' ', mu.Nombre) AS unidad, 
         CONCAT(k.Idkardex, ' ', k.tipo) AS kardex
        FROM integradora_se.evaluacion AS e
        INNER JOIN kardex AS k ON k.IdKardex = e.IdKardex
        INNER JOIN mapacurricular AS mp ON mp.id_mapa_curricular = e.id_mapa_curricular
        INNER JOIN materiaunidad AS mu ON mu.IdMateriaUnidad = e.IdMateriaUnidad
      `;
      const [rows] = await db.query(query);
      if (rows.length > 0) {
        res.json({ message: "Evaluación obtenida correctamente", data: rows });
      } else {
        res.status(404).json({ message: "No se encontraron datos" });
      }
    } catch (error) {
        console.error("Error al obtener la evaluacón:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
      }
    };

    // ---------------------- CREATE ------------------------------------
    export const createEvaluacion = async (req, res) => {
      try {
        const {IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad} = req.body;
    
        if (!IdKardex || !id_mapa_curricular || !Faltas || !Calificacion || !Estatus || !Nombre || !IdMateriaUnidad)
          {
          return res.status(400).json({ message: "Todos los campos son requeridos" });
          }
    
        const [rows] = await db.query(
          "INSERT INTO evaluacion (IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad]
        );
    
        res.status(201).json({
          message: "Evaluación creada correctamente",
          IdEvaluacion: rows.insertId,
          IdKardex, 
          id_mapa_curricular, 
          Faltas, 
          Calificacion, 
          Estatus, 
          Nombre, 
          IdMateriaUnidad
        });
      } catch (error) {
        console.error("Error al crear la evaluación:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
      }
    };
    
    // ---------------------- UPDATE ------------------------------------
    export const updateEvaluacion = async (req, res) => {
      try {
        const { IdEvaluacion } = req.params;
        const { IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad} = req.body;
    
        const [exists] = await db.query("SELECT 1 FROM evaluacion WHERE IdEvaluacion = ?", [IdEvaluacion]);
        if (!exists.length) {
          return res.status(404).json({ message: "La evaluación no existe" });
        }
    
        const [result] = await db.query(
          "UPDATE evaluacion SET IdKardex = ?, id_mapa_curricular = ?, Faltas = ?, Calificacion = ?, Estatus = ?, Nombre = ?, IdMateriaUnidad = ? WHERE IdEvaluacion = ?",
          [IdKardex, id_mapa_curricular, Faltas, Calificacion, Estatus, Nombre, IdMateriaUnidad, IdEvaluacion]
        );
    
        if (result.affectedRows === 0) {
          return res.status(400).json({ message: "No se pudo actualizar la evauación" });
        }
    
        res.status(200).json({
          message: "Evaluación actualizada correctamente",
          IdEvaluacion, 
          IdKardex, 
          id_mapa_curricular, 
          Faltas, 
          Calificacion, 
          Estatus, 
          Nombre, 
          IdMateriaUnidad
        });
      } catch (error) {
        console.error("Error al actualizar la evaluacón:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
      }
    };
    
    // ---------------------- DELETE ------------------------------------
    export const deleteEvaluacion = async (req, res) => {
      try {
        const { IdEvaluacion } = req.params;
    
        const [evaluacion] = await db.query("SELECT IdEvaluacion FROM evaluacion WHERE IdEvaluacion = ?", [IdEvaluacion]);
        if (!evaluacion.length) {
          return res.status(404).json({ message: "Evaluación no encontrada" });
        }
    
        const [rows] = await db.query("DELETE FROM evaluacion WHERE IdEvaluacion = ?", [IdEvaluacion]);
        if (rows.affectedRows > 0) {
          res.status(200).json({ message: `Evaluación con IdEvaluacion ${IdEvaluacion} eliminada correctamente` });
        } else {
          res.status(404).json({ message: "No se pudo eliminar la evaluación" });
        }
      } catch (error) {
        console.error("Error al eliminar la evaluación:", error);
        res.status(500).json({ message: "Algo salió mal", error: error.message });
      }
    };
    