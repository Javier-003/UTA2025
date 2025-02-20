import { Router } from "express";

import {getCargaMaterias, createCargaMaterias, updateCargaMaterias, deleteCargaMaterias} 
from "../../controllers/PlanificacionAcademica/cargamaterias.Controller.js";

const router = Router();

router.get("/", getCargaMaterias);
//router.get("/, getFiltroCargaMaterias");
router.post("/create", createCargaMaterias);
router.put("/update/:idGrupoMateria", updateCargaMaterias);
router.delete("/delete/:idGrupoMateria", deleteCargaMaterias);

export default router;

