import { Router } from "express";

import { createEdificio, deleteEdificio, getEdificiotodos, updateEdificio } 
from "../../controllers/Nucleo/edificio.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getEdificiotodos);
router.post("/create",  bitacora('Creación', 'Se agrego  un edificio'), createEdificio );
router.put("/update/:idEdificio", bitacora('Actualización', 'Se actualizo  un edificio'), updateEdificio);
router.delete("/delete/:idEdificio",bitacora('Eliminación', 'Se elimino  un edificio'), deleteEdificio);

export default router;
