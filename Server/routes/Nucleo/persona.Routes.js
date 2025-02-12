import { Router } from "express";

import { createPersona, deletePersona, getPersonatodos, updatePersona } 
from "../../controllers/Nucleo/persona.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getPersonatodos);
router.post("/create", bitacora('Creación', 'Se agrego a una persona'), createPersona);
router.put("/update/:idPersona", bitacora('Actualizacion', 'Se actualizo una persona'), updatePersona);
router.delete("/delete/:idPersona",bitacora('Eliminación', 'Se elimino una persona'), deletePersona);

export default router;
