import { Router } from "express";
import { createNivelEstudio, deleteNivelEstudio, getnivelestudiotodos, updateNivelEstudio } 
from "../../controllers/PlanificacionAcademica/nivelestudio.Controller.js";

const router = Router();

router.get("/",getnivelestudiotodos);
router.post("/create", createNivelEstudio);
router.put("/update/:idnivelEstudio",updateNivelEstudio );
router.delete("/delete/:idnivelEstudio",deleteNivelEstudio );

export default router;