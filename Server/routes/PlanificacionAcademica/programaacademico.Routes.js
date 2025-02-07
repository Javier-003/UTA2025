import { Router } from "express";

import { createProgramaAcademico, deleteProgramaAcademico, getProgramaAcademico, updateProgramaAcademico }
from "../../controllers/PlanificacionAcademica/programa_academico.Controller.js";

const router = Router();

router.get("/", getProgramaAcademico);
router.post("/create",createProgramaAcademico);
router.put("/update/:idProgramaAcademico", updateProgramaAcademico);
router.delete("/delete/:idProgramaAcademico",deleteProgramaAcademico );

export default router;
