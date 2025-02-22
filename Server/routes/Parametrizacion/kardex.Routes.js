import { Router } from "express";

import { getKardex, createKardex, updateKardex, deleteKardex } 
from "../../controllers/Parametrizacion/kardex.Controller.js";

const router = Router();

router.get("/", getKardex);
router.post("/create", createKardex);
router.put("/update/:idKardex", updateKardex);
router.delete("/delete/:idKardex", deleteKardex);

export default router;

