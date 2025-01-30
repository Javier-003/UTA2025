import { Router } from "express";

import { createDepartamento, deleteDepartamento, getDepartamentotodos, updateDepartamento } 
from "../../controllers/Nucleo/departamento.Controller.js";

const router = Router();

router.get("/",getDepartamentotodos);
router.post("/create",createDepartamento );
router.put("/update/:idDepartamento", updateDepartamento);
router.delete("/delete/:idDepartamento", deleteDepartamento);

export default router;
