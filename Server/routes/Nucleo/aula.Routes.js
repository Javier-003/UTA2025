import { Router } from "express";

import { createAula, deleteAula, getAulatodos, updateAula } 
from "../../controllers/Nucleo/aula.Controller.js";

const router = Router();

router.get("/",getAulatodos);
router.post("/create", createAula);
router.put("/update/:IdAula", updateAula);
router.delete("/delete/:IdAula",deleteAula );

export default router;
