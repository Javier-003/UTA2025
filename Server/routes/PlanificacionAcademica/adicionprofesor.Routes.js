import { Router } from "express";
import { createAdicionProfesor, deleteAdicionProfesor, getAdicionProfesoresTodos, updateAdicionProfesor } 
from "../../controllers/PlanificacionAcademica/adicionprofesor.Controller.js";

const router = Router();

router.get("/", getAdicionProfesoresTodos);
router.post("/create", createAdicionProfesor);
router.put("/update/:idAdicionProfesor", updateAdicionProfesor);
router.delete("/delete/:idAdicionProfesor", deleteAdicionProfesor);

export default router;