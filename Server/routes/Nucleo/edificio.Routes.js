import { Router } from "express";
import { createEdificio, deleteEdificio, getEdificiotodos, updateEdificio } 
from "../../controllers/Nucleo/edificio.Controller.js";

const router = Router();

router.get("/",getEdificiotodos);
router.post("/create",createEdificio );
router.put("/update/:id_edificio", updateEdificio);
router.delete("/delete/:id_edificio", deleteEdificio);

export default router;
