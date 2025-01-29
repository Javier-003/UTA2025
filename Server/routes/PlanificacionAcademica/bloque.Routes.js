import { Router } from "express";
import { createBloque, deleteBloque, getBloquetodos, updateBloque } 
from "../../controllers/PlanificacionAcademica/bloque.Controller.js";

const router = Router();

router.get("/",getBloquetodos );
router.post("/create",createBloque);
router.put("/update/:idBloque",updateBloque );
router.delete("/delete/:idBloque", deleteBloque);

export default router;
