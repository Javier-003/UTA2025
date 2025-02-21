import { Router } from "express";

import { createPeriodo, deletePeriodo, getPeriodotodos, updatePeriodo } 
from "../../controllers/PlanificacionAcademica/periodo.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getPeriodotodos );
router.post("/create", bitacora('Creación', 'Se agrego un Periodo'),createPeriodo);
router.put("/update/:idPeriodo", bitacora('Actualización', 'Se actualizo un Periodo'), updatePeriodo);
router.delete("/delete/:idPeriodo", bitacora('Eliminación', 'Se elimino un Periodo'), deletePeriodo);

export default router;
