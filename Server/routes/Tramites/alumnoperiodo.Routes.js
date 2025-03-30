import { Router } from "express";

import {getAlumnoPeriodo} 
from "../../controllers/Tramites/alumnoPeriodo.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getAlumnoPeriodo );

export default router;
