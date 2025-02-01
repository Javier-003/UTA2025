import { Router } from "express";

import { createAdministrativo, deleteAdministrativo, getAdministrativotodos, updateAdministrativo } 
from "../../controllers/Nucleo/administrativo.Controller.js";

const router = Router();

router.get("/",getAdministrativotodos );
router.post("/create", createAdministrativo);
router.put("/update/:idAdministrativo", updateAdministrativo);
router.delete("/delete/:idAdministrativo", deleteAdministrativo);

export default router;
