import { Router } from "express";
import { createPeriodo, deletePeriodo, getPeriodotodos, updatePeriodo } 
from "../../controllers/PlanificacionAcademica/periodo.Controller.js";

const router = Router();

router.get("/",getPeriodotodos );
router.post("/create", createPeriodo);
router.put("/update/:idPeriodo", updatePeriodo);
router.delete("/delete/:idPeriodo", deletePeriodo);

export default router;
 