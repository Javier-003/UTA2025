import { Router } from "express";
import { getEvaluacion, createEvaluacion, updateEvaluacion, deleteEvaluacion} 
from "../../controllers/Parametrizacion/evaluacion.Controller.js";

const router = Router();

router.get("/",getEvaluacion);
router.post("/create",createEvaluacion );
router.put("/update/:IdEvaluacion",updateEvaluacion);
router.delete("/delete/:IdEvaluacion",deleteEvaluacion);

export default router;
