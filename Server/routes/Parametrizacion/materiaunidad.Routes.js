import { Router } from "express";
import { createMateriaUnidad, deleteMateriaUnidad, getMateriaUnidadtodos, updateMateriaUnidad } 
from "../../controllers/Parametrizacion/materiaunidad.Controller.js";

const router = Router();

router.get("/", getMateriaUnidadtodos);
router.post("/create", createMateriaUnidad);
router.put("/update/:IdMateriaUnidad",updateMateriaUnidad );
router.delete("/delete/:IdMateriaUnidad", deleteMateriaUnidad);

export default router;
