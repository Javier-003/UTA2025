import { Router } from "express"
import { createRol, deleteRol } 
from "../../controllers/Nucleo/rol.Controller.js";

const router = Router();

router.post("/create", createRol);
router.delete("/delete/:idRol", deleteRol);

export default router;
