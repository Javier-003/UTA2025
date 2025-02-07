import { Router } from "express";
import { createMapaCurricular, deleteMapaCurricular, getMapaCurriculartodos, updateMapaCurricular } 
from "../../controllers/PlanificacionAcademica/mapacurricular..Controller.js";

const router = Router();

router.get("/", getMapaCurriculartodos);
router.post("/create", createMapaCurricular);
router.put("/update/:idMapaCurricular", updateMapaCurricular);
router.delete("/delete/:idMapaCurricular", deleteMapaCurricular);

export default router;