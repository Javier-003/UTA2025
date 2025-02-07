import { Router } from "express"
import { createUsuario, deleteUsuario, getUsuarioTodos, updateUsuario }
from "../../controllers/Nucleo/usuario.Controller.js";

const router = Router();

router.get("/",getUsuarioTodos );
router.post("/create", createUsuario);
router.put("/update/:idUsuario", updateUsuario);
router.delete("/delete/:idUsuario",deleteUsuario );

export default router;
