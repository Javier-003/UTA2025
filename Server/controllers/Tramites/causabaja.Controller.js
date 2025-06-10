import { db } from "../../db/connection.js";

// 🔹 OBTENER TODAS LAS CAUSAS DE BAJA
export const getCausasBaja = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM bajacausa");

    res.json({
      message: "Causas de baja obtenidas correctamente",
      data: rows.length > 0 ? rows : [],
    });
  } catch (error) {
    console.error("Error al obtener causas de baja:", error);
    res.status(500).json({
      message: "Algo salió mal al obtener las causas de baja",
      error: error.message,
    });
  }
};
