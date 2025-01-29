import { Router } from "express";
import { createTramiteProceso, deleteTramiteProceso, getTramiteProcesotodos, updateTramiteProceso }
from "../../controllers/Parametrizacion/tramiteproceso.Controller.js";

const router = Router();

router.get("/", getTramiteProcesotodos);
router.post("/create" , createTramiteProceso);
router.put("/update/:idTramiteProceso", updateTramiteProceso);
router.delete("/delete/:idTramiteProceso",deleteTramiteProceso );

export default router;
