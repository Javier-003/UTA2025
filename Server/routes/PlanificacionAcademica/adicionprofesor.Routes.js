import { Router } from "express";

import { createAdicionProfesor, deleteAdicionProfesor, getAdicionProfesoresTodos, updateAdicionProfesor } 
from "../../controllers/PlanificacionAcademica/adicionprofesor.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getAdicionProfesoresTodos);
router.post("/create",bitacora('Creación', 'Se agrego un Adición Profesor'), createAdicionProfesor);
router.put("/update/:idAdicionProfesor", bitacora('Actualización', 'Se actualizo un Adición Profesor'), updateAdicionProfesor);
router.delete("/delete/:idAdicionProfesor",  bitacora('Eliminación', 'Se elimino un Adición Profesor'), deleteAdicionProfesor);

export default router;
