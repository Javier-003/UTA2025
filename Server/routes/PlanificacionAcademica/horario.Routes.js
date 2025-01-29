import { Router } from "express";

import { getHorario, createHorario, updateHorario, deleteHorario } 
from "../../controllers/PlanificacionAcademica/horario.Controller.js";

const router = Router();

router.get("/", getHorario);
router.post("/create", createHorario);
router.put("/update/:idHorario", updateHorario);
router.delete("/delete/:idHorario", deleteHorario);

export default router;

