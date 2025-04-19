import { Router } from "express";

import {getCausasBaja } 
from "../../controllers/Tramites/causabaja.Controller.js";


const router = Router();

router.get("/", getCausasBaja);

export default router;
