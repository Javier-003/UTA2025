import { Router } from "express";

import { createAlumno, deleteAlumno, getAlumnostodos, updateAlumno } 
from "../../controllers/Nucleo/alumno.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getAlumnostodos );
router.post("/create", bitacora('Creación', 'Se agrego a un Alumno'), createAlumno);
router.put("/update/:idAlumno", bitacora('Actualización', 'Se actualizo a un Alumno'), updateAlumno );
router.delete("/delete/:idAlumno",bitacora('Eliminación', 'Se elimino a un Alumno') , deleteAlumno);

export default router;
