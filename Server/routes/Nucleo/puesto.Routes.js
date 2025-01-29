import { Router } from "express";

import {createPuesto, deletePuesto, getPuestotodos, updatePuesto } 
from "../../controllers/Nucleo/puesto.Controller.js";

const router = Router();

router.get("/", getPuestotodos);
router.post("/create", createPuesto);
router.put("/update/:id_puesto",updatePuesto);
router.delete("/delete/:id_puesto",deletePuesto );

export default router;
