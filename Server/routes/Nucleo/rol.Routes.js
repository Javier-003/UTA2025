import { Router } from "express"

import { createRol, deleteRol, getRol, getAllRols, getDelRol } from "../../controllers/Nucleo/rol.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getAllRols);
router.get("/get/:idUsuario", getRol);
router.get("/getDel/:idUsuario", getDelRol);
router.post('/create/',bitacora('Creación', 'Se agrego  un Rol a un Usuario'), createRol);
router.post('/delete/',bitacora('Eliminación', 'Se elimino un Rol a un Usuario'),deleteRol);

export default router;
