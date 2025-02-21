import { Router } from "express";

import { createTramite, deleteTramite, getTramitetodos, updateTramite } 
from "../../controllers/Parametrizacion/tramite.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getTramitetodos);
router.post("/create", bitacora('Creación', 'Se agrego un Tramite'), createTramite );
router.put("/update/:idTramite",bitacora('Actualización', 'Se actualizo un Tramite'),  updateTramite );
router.delete("/delete/:idTramite",  bitacora('Eliminación', 'Se elimino un Tramite'), deleteTramite);

export default router;
