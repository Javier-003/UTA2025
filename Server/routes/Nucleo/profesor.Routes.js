import { Router } from "express";

import { createProfesor, deleteProfesor, getProfesortodos, updateProfesor } 
from "../../controllers/Nucleo/profesor.Controller.js";

const router = Router();

router.get("/",getProfesortodos);
router.post("/create", createProfesor);
router.put("/update/:idProfesor", updateProfesor);
router.delete("/delete/:idProfesor", deleteProfesor);

export default router;
