import { Router } from "express";

import { getKardex, createKardex, updateKardex, deleteKardex } 
from "../../controllers/Parametrizacion/kardex.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getKardex);
router.post("/create",bitacora('Creación', 'Se agrego a un Kardex'), createKardex);
router.put("/update/:idKardex", bitacora('Actualización', 'Se actualizo un Kardex'), updateKardex);
router.delete("/delete/:idKardex",bitacora('Eliminación', 'Se elimino un Kardex') , deleteKardex);

export default router;

