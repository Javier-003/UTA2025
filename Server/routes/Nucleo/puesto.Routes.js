import { Router } from "express";

import {createPuesto, deletePuesto, getPuestotodos, updatePuesto } 
from "../../controllers/Nucleo/puesto.Controller.js";

const router = Router();

router.get("/", getPuestotodos);
router.post("/create", createPuesto);
router.put("/update/:idPuesto",updatePuesto);
router.delete("/delete/:idPuesto",deletePuesto );

export default router;
