import { Router } from "express";

import { getKardex, createKardex, updateKardex, deleteKardex } 
from "../../controllers/Parametrizacion/kardex.Controller.js";

const router = Router();

router.get("/", getKardex);
router.post("/create", createKardex);
router.put("/update/:IdKardex", updateKardex);
router.delete("/delete/:IdKardex", deleteKardex);

export default router;

