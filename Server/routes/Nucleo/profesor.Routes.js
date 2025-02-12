import { Router } from "express";

import { createProfesor, deleteProfesor, getProfesortodos, updateProfesor } 
from "../../controllers/Nucleo/profesor.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getProfesortodos);
router.post("/create",bitacora('Creación', 'Se agrego a un Profesor'),  createProfesor);
router.put("/update/:idProfesor", bitacora('Actualización', 'Se actualizo a un Profesor'),updateProfesor);
router.delete("/delete/:idProfesor", bitacora('Eliminar', 'Se elimino a un Profesor'),deleteProfesor);

export default router;
