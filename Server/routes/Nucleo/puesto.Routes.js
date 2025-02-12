import { Router } from "express";

import {createPuesto, deletePuesto, getPuestotodos, updatePuesto } 
from "../../controllers/Nucleo/puesto.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getPuestotodos);
router.post("/create",bitacora('Creación', 'Se agrego  un Puesto'),  createPuesto);
router.put("/update/:idPuesto",bitacora('Actualización', 'Se actualizo  un Puesto'), updatePuesto);
router.delete("/delete/:idPuesto",bitacora('Eliminación', 'Se elimino  un Puesto'), deletePuesto );

export default router;
