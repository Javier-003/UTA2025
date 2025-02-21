import { Router } from "express";

import { getActividadtodos, createActividad,updateActividad,deleteActividad} 
from "../../controllers/Parametrizacion/actividad.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getActividadtodos);
router.post("/create", bitacora('Creación', 'Se agrego una Actividad'),createActividad);
router.put("/update/:idActividad", bitacora('Actualización', 'Se actualizo una Actividad'),updateActividad);
router.delete("/delete/:idActividad",bitacora('Eliminación', 'Se elimino una Actividad'),  deleteActividad);

export default router;
