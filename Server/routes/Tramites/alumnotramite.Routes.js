import { Router } from "express";

import { getAlumnoTramitetodos, createAlumnoTramite, updateAlumnoTramite, deleteAlumnoTramite } 
from "../../controllers/Tramites/alumnotramite.Controller.js";

const router = Router();

router.get("/", getAlumnoTramitetodos);
router.post("/create" ,createAlumnoTramite );
router.put("/update/:idAlumnoTramite", updateAlumnoTramite);
router.delete("/delete/:idAlumnoTramite", deleteAlumnoTramite);

export default router;
