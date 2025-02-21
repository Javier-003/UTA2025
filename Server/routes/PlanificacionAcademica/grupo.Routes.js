import { Router } from "express";

import { createGrupo, deleteGrupo, getGruposTodos, updateGrupo } 
from "../../controllers/PlanificacionAcademica/grupo.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getGruposTodos);
router.post("/create", bitacora('Creación', 'Se agrego un Grupo'), createGrupo);
router.put("/update/:idGrupo", bitacora('Actualización', 'Se actualizo un Grupo'),  updateGrupo);
router.delete("/delete/:idGrupo", bitacora('Eliminación', 'Se elimino un Grupo'), deleteGrupo);

export default router;
