import { Router } from "express"

import { createRol, deleteRol, getRolestodos } from "../../controllers/Nucleo/rol.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getRolestodos);
router.post('/create/',bitacora('Creación', 'Se agrego  un Rol a un Usuario'), createRol);
router.post('/delete/:idRol', bitacora('Eliminación', 'Se elimino un Rol a un Usuario'),deleteRol);

export default router;
