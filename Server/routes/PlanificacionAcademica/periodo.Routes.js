import { Router } from "express";
import { createPeriodo, deletePeriodo, getPeriodotodos, updatePeriodo } 
from "../../controllers/PlanificacionAcademica/periodo.Controller.js";


const router = Router();

router.get("/",getPeriodotodos );
router.post("/create", createPeriodo);
router.put("/update/:id_periodo", updatePeriodo);
router.delete("/delete/:id_periodo", deletePeriodo);

export default router;
