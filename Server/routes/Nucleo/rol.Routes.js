import { Router } from "express"
import { createRol, deleteRol } 
from "../../controllers/Nucleo/rol.Controller.js";

const router = Router();

router.post('/rolUsuario/agregar', createRol);
router.post('/rolUsuario/eliminar', deleteRol);

export default router;
