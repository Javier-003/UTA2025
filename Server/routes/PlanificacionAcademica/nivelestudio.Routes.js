import { Router } from "express";

import { createNivelEstudio, deleteNivelEstudio, getnivelestudiotodos, updateNivelEstudio } 
from "../../controllers/PlanificacionAcademica/nivelestudio.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getnivelestudiotodos);
router.post("/create", bitacora('Creación', 'Se agrego un Nivel de Estudio'), createNivelEstudio);
router.put("/update/:idnivelEstudio", bitacora('Actualización', 'Se actualizo un Nivel de Estudio'),updateNivelEstudio );
router.delete("/delete/:idnivelEstudio", bitacora('Eliminación', 'Se elimino un Nivel de Estudio'),  deleteNivelEstudio );

export default router;
