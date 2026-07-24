import { Router } from "express";

import {getAlumnoPeriodo} 
from "../../controllers/Tramites/alumnoperiodo.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getAlumnoPeriodo );

export default router;
