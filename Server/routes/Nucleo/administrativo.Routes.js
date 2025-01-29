import { Router } from "express";
import { createAdministrativo, deleteAdministrativo, getAdministrativotodos, updateAdministrativo } 
from "../../controllers/Nucleo/administrativo.Controller.js";

const router = Router();

router.get("/",getAdministrativotodos );
router.post("/create", createAdministrativo);
router.put("/update/:id_administrativo", updateAdministrativo);
router.delete("/delete/:id_administrativo", deleteAdministrativo);

export default router;
