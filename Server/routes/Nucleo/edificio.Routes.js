import { Router } from "express";

import { createEdificio, deleteEdificio, getEdificiotodos, updateEdificio } 
from "../../controllers/Nucleo/edificio.Controller.js";

const router = Router();

router.get("/",getEdificiotodos);
router.post("/create",createEdificio );
router.put("/update/:idEdificio", updateEdificio);
router.delete("/delete/:idEdificio", deleteEdificio);

export default router;
