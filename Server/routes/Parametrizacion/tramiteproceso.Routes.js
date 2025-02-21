import { Router } from "express";

import { createTramiteProceso, deleteTramiteProceso, getTramiteProcesotodos, updateTramiteProceso }
from "../../controllers/Parametrizacion/tramiteproceso.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getTramiteProcesotodos);
router.post("/create" ,bitacora('Creación', 'Se agrego un Tramite Proceso'), createTramiteProceso);
router.put("/update/:idTramiteProceso",bitacora('Actualización', 'Se actualizo un Tramite Proceso'),  updateTramiteProceso);
router.delete("/delete/:idTramiteProceso", bitacora('Eliminación', 'Se elimino un Tramite Proceso'), deleteTramiteProceso );

export default router;
