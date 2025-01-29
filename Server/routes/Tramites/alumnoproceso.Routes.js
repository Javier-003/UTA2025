import { Router } from "express";

import { createAlumnoProceso, deleteAlumnoProceso, getAlumnoProcesotodos, updateAlumnoProceso } 
from "../../controllers/Tramites/alumnoproceso.Controller.js";

const router = Router();

router.get("/", getAlumnoProcesotodos );
router.post("/create", createAlumnoProceso );
router.put("/update/:idAlumnoProceso", updateAlumnoProceso);
router.delete("/delete/:idAlumnoProceso", deleteAlumnoProceso);

export default router;
