import { Router } from "express";

import { createPrograma_Academico, deletePrograma_Academico, getPrograma_Academicotodos, updatePrograma_Academico }
from "../../controllers/PlanificacionAcademica/programa_academico.Controller.js";

const router = Router();

router.get("/", getPrograma_Academicotodos);
router.post("/create",createPrograma_Academico);
router.put("/update/:id_programa_academico", updatePrograma_Academico);
router.delete("/delete/:id_programa_academico",deletePrograma_Academico );

export default router;
