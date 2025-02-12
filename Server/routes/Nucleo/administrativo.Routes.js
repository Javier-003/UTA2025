import { Router } from "express";

import { createAdministrativo, deleteAdministrativo, getAdministrativotodos, updateAdministrativo } 
from "../../controllers/Nucleo/administrativo.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/" ,getAdministrativotodos );
router.post("/create", bitacora('Creación', 'Se agrego a un Administrativo'),createAdministrativo);
router.put("/update/:idAdministrativo", bitacora('Actualización', 'Se actualizo a un Administrativo'), updateAdministrativo);
router.delete("/delete/:idAdministrativo",bitacora('Eliminación', 'Se elimino a un Administrativo') ,deleteAdministrativo);

export default router;
