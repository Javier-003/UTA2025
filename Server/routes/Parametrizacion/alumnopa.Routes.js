import { Router } from "express";
import { createAlumnopa, deleteAlumnopa, getAlumnopatodos, updateAlumnopa } 
from "../../controllers/Parametrizacion/alumnopa.Controller.js";

const router = Router();

router.get("/",getAlumnopatodos );
router.post("/create", createAlumnopa);
router.put("/update/:idAlumnoPrograma",updateAlumnopa );
router.delete("/delete/:idAlumnoPrograma", deleteAlumnopa);

export default router;