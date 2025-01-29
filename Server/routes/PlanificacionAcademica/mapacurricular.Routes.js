import { Router } from "express";
import { createMapaCurricular, deleteMapaCurricular, getMapaCurriculartodos, updateMapaCurricular } 
from "../../controllers/PlanificacionAcademica/mapacurricular..Controller.js";

const router = Router();

router.get("/",getMapaCurriculartodos );
router.post("/create",createMapaCurricular );
router.put("/update/:id_mapa_curricular", updateMapaCurricular);
router.delete("/delete/:id_mapa_curricular",deleteMapaCurricular );

export default router;
