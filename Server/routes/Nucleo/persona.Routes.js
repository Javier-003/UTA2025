import { Router } from "express";
import { createPersona, deletePersona, getPersonatodos, updatePersona } 
from "../../controllers/Nucleo/persona.Controller.js";

const router = Router();

router.get("/", getPersonatodos);
router.post("/create", createPersona);
router.put("/update/:id_persona", updatePersona);
router.delete("/delete/:id_persona", deletePersona);

export default router;
