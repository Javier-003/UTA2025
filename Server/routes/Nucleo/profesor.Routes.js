import { Router } from "express";
import { createProfesor, deleteProfesor, getProfesortodos, updateProfesor } 
from "../../controllers/Nucleo/profesor.Controller.js";

const router = Router();

router.get("/",getProfesortodos);
router.post("/create", createProfesor);
router.put("/update/:id_profesor", updateProfesor);
router.delete("/delete/:id_profesor", deleteProfesor);

export default router;
