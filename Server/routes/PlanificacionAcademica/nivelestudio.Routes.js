import { Router } from "express";
import { createNivelEstudio, deleteNivelEstudio, getnivelestudiotodos, updateNivelEstudio } 
from "../../controllers/PlanificacionAcademica/nivelestudio.Controller.js";

const router = Router();

router.get("/",getnivelestudiotodos);
router.post("/create", createNivelEstudio);
router.put("/update/:id_nivel_estudio",updateNivelEstudio );
router.delete("/delete/:id_nivel_estudio",deleteNivelEstudio );

export default router;
