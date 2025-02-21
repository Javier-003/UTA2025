import  { Router } from 'express';

import { createOfertaAcademica, deleteOfertaAcademica, getOfertaAcademicaTodos, updateOfertaAcademica } 
from '../../controllers/PlanificacionAcademica/ofertaacademica.Controller.js';

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getOfertaAcademicaTodos);
router.post("/create", bitacora('Creación', 'Se agrego una Oferta Academica'), createOfertaAcademica); 
router.put("/update/:idOfertaAcademica", bitacora('Actualización', 'Se actualizo una Oferta Academica'), updateOfertaAcademica);
router.delete("/delete/:idOfertaAcademica", bitacora('Eliminación', 'Se elimino una Oferta Academica'), deleteOfertaAcademica);

export default router;
