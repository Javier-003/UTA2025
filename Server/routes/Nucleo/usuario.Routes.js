import { Router } from "express"

import { createUsuario, deleteUsuario, getUsuarioTodos, updateUsuario }
from "../../controllers/Nucleo/usuario.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getUsuarioTodos );
router.post("/create", bitacora('Creación', 'Se agrego  un Usuario'), createUsuario);
router.put("/update/:idUsuario", bitacora('Actualización', 'Se actualizo un Usuario'),updateUsuario);
router.delete("/delete/:idUsuario",bitacora('Eliminación', 'Se elimino un Usuario'), deleteUsuario );

export default router;
