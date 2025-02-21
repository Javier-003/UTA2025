import { Router } from "express";

import { createMateriaUnidad, deleteMateriaUnidad, getMateriaUnidadtodos, updateMateriaUnidad } 
from "../../controllers/Parametrizacion/materiaunidad.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getMateriaUnidadtodos);
router.post("/create", bitacora('Creación', 'Se agrego una Materia Unidad'), createMateriaUnidad);
router.put("/update/:idMateriaUnidad", bitacora('Actualización', 'Se actualizo una Materia Unidad'), updateMateriaUnidad );
router.delete("/delete/:idMateriaUnidad", bitacora('Eliminación', 'Se elimino una Materia Unidad'), deleteMateriaUnidad);

export default router;
