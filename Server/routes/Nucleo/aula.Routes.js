import { Router } from "express";

import { createAula, deleteAula, getAulatodos, updateAula } 
from "../../controllers/Nucleo/aula.Controller.js";

const router = Router();

router.get("/",getAulatodos);
router.post("/create", createAula);
router.put("/update/:idAula", updateAula);
router.delete("/delete/:idAula",deleteAula );

export default router;
