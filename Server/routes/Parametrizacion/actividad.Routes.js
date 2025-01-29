import { Router } from "express";
import { getActividadtodos, createActividad,updateActividad,deleteActividad} 
from "../../controllers/Parametrizacion/actividad.Controller.js";

const router = Router();

router.get("/", getActividadtodos);
router.post("/create", createActividad);
router.put("/update/:idActividad", updateActividad);
router.delete("/delete/:idActividad", deleteActividad);

export default router;
