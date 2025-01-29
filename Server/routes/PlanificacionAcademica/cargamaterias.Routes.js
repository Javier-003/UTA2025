import { Router } from "express";

import {getCargaMaterias, createCargaMaterias, updateCargaMaterias, deleteCargaMaterias} 
from "../../controllers/PlanificacionAcademica/cargamaterias.Controller.js";

const router = Router();

router.get("/", getCargaMaterias);
router.post("/create", createCargaMaterias);
router.put("/update/:id_grupo_materia", updateCargaMaterias);
router.delete("/delete/:id_grupo_materia", deleteCargaMaterias);

export default router;

