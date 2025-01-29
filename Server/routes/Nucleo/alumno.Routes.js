import { Router } from "express";
import { createAlumno, deleteAlumno, getAlumnostodos, updateAlumno } 
from "../../controllers/Nucleo/alumno.Controller.js";

const router = Router();

router.get("/",getAlumnostodos );
router.post("/create", createAlumno);
router.put("/update/:id_alumno",updateAlumno );
router.delete("/delete/:id_alumno", deleteAlumno);

export default router;
