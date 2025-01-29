import { Router } from "express";

import { createTramite, deleteTramite, getTramitetodos, updateTramite } 
from "../../controllers/Parametrizacion/tramite.Controller.js";

const router = Router();

router.get("/", getTramitetodos);
router.post("/create",createTramite );
router.put("/update/:idTramite",updateTramite );
router.delete("/delete/:idTramite", deleteTramite);

export default router;
