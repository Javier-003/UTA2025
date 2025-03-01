import { Router } from "express";
import { getEvaluacion, createEvaluacion, updateEvaluacion, deleteEvaluacion} 
from "../../controllers/Parametrizacion/evaluacion.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getEvaluacion);
router.post("/create",bitacora('Creación', 'Se agrego a una Evaluacion'),createEvaluacion );
router.put("/update/:idEvaluacion",bitacora('Actualización', 'Se actualizo una Evaluación '), updateEvaluacion);
router.delete("/delete/:idEvaluacion",bitacora('Eliminación', 'Se elimino una Evaluación') ,deleteEvaluacion);

export default router;
