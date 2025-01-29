import { Router } from "express";
import { createBitacora, getBitacoratodos } from "../../controllers/Nucleo/bitacora.Controller.js";

const router = Router();

router.get("/",getBitacoratodos );
router.post("/create",createBitacora );

export default router;
