import { Router } from "express";
import { createAlumno, deleteAlumno, getAlumnostodos, updateAlumno } 
from "../../controllers/Nucleo/alumno.Controller.js";

const router = Router();

router.get("/",getAlumnostodos );
router.post("/create", createAlumno);
router.put("/update/:idAlumno",updateAlumno );
router.delete("/delete/:idAlumno", deleteAlumno);

export default router;
