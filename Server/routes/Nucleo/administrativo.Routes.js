import { Router } from "express";

import { createAdministrativo, deleteAdministrativo, getAdministrativotodos, updateAdministrativo } 
from "../../controllers/Nucleo/administrativo.Controller.js";

const router = Router();

router.get("/",getAdministrativotodos );
router.post("/create", createAdministrativo);
router.put("/update/:idAadministrativo", updateAdministrativo);
router.delete("/delete/:idAadministrativo", deleteAdministrativo);

export default router;
