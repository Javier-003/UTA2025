import { Router } from "express";

import { getAlumnoTramitetodos, createAlumnoTramite, updateAlumnoTramite, deleteAlumnoTramite } 
from "../../controllers/Tramites/alumnotramite.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getAlumnoTramitetodos);
router.post("/create", bitacora('Creación', 'Se agrego un Alumno Tramite'), createAlumnoTramite );
router.put("/update/:idAlumnoTramite", bitacora('Actualización', 'Se actualizo un Alumno Tramite'), updateAlumnoTramite);
router.delete("/delete/:idAlumnoTramite", bitacora('Eliminación', 'Se elimino un Alumno Tramite'), deleteAlumnoTramite);

export default router;
