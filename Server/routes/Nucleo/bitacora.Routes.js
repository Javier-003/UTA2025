import { Router } from "express";

import { getBitacoratodos } from "../../controllers/Nucleo/bitacora.Controller.js";

const router = Router();

router.get("/",getBitacoratodos );

export default router;
