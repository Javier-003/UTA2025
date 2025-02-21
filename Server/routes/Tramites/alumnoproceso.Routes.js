import { Router } from "express";

import { createAlumnoProceso, deleteAlumnoProceso, getAlumnoProcesotodos, updateAlumnoProceso } 
from "../../controllers/Tramites/alumnoproceso.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getAlumnoProcesotodos );
router.post("/create", bitacora('Creación', 'Se agrego un Alumno Proceso'), createAlumnoProceso );
router.put("/update/:idAlumnoProceso", bitacora('Actualización', 'Se actualizo un Alumno Proceso'), updateAlumnoProceso);
router.delete("/delete/:idAlumnoProceso", bitacora('Eliminación', 'Se elimino un Alumno Proceso'),  deleteAlumnoProceso);

export default router;
