import { Router } from "express";

import { createDepartamento, deleteDepartamento, getDepartamentotodos, updateDepartamento } 
from "../../controllers/Nucleo/departamento.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getDepartamentotodos);
router.post("/create",bitacora('creación', 'Se agrego  un Departamento'), createDepartamento );
router.put("/update/:idDepartamento",bitacora('Actualización', 'Se actualizo  un Departamento'),updateDepartamento);
router.delete("/delete/:idDepartamento",bitacora('Eliminación', 'Se elimino  un Departamento'), deleteDepartamento);

export default router;
