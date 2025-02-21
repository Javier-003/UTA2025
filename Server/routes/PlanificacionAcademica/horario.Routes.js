import { Router } from "express";

import { getHorario, createHorario, updateHorario, deleteHorario } 
from "../../controllers/PlanificacionAcademica/horario.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getHorario);
router.post("/create", bitacora('Creación', 'Se agrego un Horario'), createHorario);
router.put("/update/:idHorario", bitacora('Actualización', 'Se actualizo un Horario'), updateHorario);
router.delete("/delete/:idHorario", bitacora('Eliminación', 'Se elimino un Horario'),  deleteHorario);

export default router;
