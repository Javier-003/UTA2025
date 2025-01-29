import { Router } from "express";
import { createDepartamento, deleteDepartamento, getDepartamentotodos, updateDepartamento } 
from "../../controllers/Nucleo/departamento.Controller.js";


const router = Router();

router.get("/",getDepartamentotodos);
router.post("/create",createDepartamento );
router.put("/update/:id_departamento", updateDepartamento);
router.delete("/delete/:id_departamento", deleteDepartamento);

export default router;
