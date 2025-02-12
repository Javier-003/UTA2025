import { Router } from "express";

import { createAula, deleteAula, getAulatodos, updateAula } 
from "../../controllers/Nucleo/aula.Controller.js";

import bitacora from "../../middleware/bitacora.js";


const router = Router();

router.get("/",getAulatodos);
router.post("/create",bitacora('Creación', 'Se agrego  un Aula'), createAula);
router.put("/update/:idAula",bitacora('Actualización', 'Se actualizo a un Aula'), updateAula);
router.delete("/delete/:idAula", bitacora('Eliminación', 'Se elimino a un Aula') , deleteAula );

export default router;
