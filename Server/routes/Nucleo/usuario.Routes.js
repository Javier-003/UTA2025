import { Router } from "express"

import { createUsuario, deleteUsuario, getUsuarioTodos, updateUsuario }
 from "../../controllers/Nucleo/usuario.Controller.js";

const router = Router();

router.get("/",getUsuarioTodos );
router.post("/create", createUsuario);
router.put("/update/:id_user", updateUsuario);
router.delete("/delete/:id_user",deleteUsuario );

export default router;
