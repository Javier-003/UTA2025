import { Router } from "express";

import { createMapaCurricular, deleteMapaCurricular, getMapaCurriculartodos, updateMapaCurricular } 
from "../../controllers/PlanificacionAcademica/mapacurricular..Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getMapaCurriculartodos);
router.post("/create",bitacora('Creación', 'Se agrego un Mapa Curricular'), createMapaCurricular);
router.put("/update/:idMapaCurricular",bitacora('Actualización', 'Se actualizo un Mapa Curricular'), updateMapaCurricular);
router.delete("/delete/:idMapaCurricular",bitacora('Eliminación', 'Se elimino un Mapa Curricular'), deleteMapaCurricular);

export default router;
