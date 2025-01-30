import { Router } from "express";

import { createPersona, deletePersona, getPersonatodos, updatePersona } 
from "../../controllers/Nucleo/persona.Controller.js";

const router = Router();

router.get("/", getPersonatodos);
router.post("/create", createPersona);
router.put("/update/:idPersona", updatePersona);
router.delete("/delete/:idPersona", deletePersona);

export default router;
