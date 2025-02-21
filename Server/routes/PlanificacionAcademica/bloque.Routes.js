import { Router } from "express";

import { createBloque, deleteBloque, getBloquetodos, updateBloque } 
from "../../controllers/PlanificacionAcademica/bloque.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getBloquetodos );
router.post("/create", bitacora('Creación', 'Se agrego un Bloque'), createBloque);
router.put("/update/:idBloque", bitacora('Actualización', 'Se actualizo un Bloque'), updateBloque );
router.delete("/delete/:idBloque", bitacora('Eliminación', 'Se elimino un Bloque'), deleteBloque);

export default router;
