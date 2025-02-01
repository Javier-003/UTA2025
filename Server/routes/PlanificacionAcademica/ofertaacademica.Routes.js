import  { Router } from 'express';
import { createOfertaAcademica, deleteOfertaAcademica, getOfertaAcademicaTodos, updateOfertaAcademica } 
from '../../controllers/PlanificacionAcademica/ofertaacademica.Controller.js';

const router = Router();
router.get("/", getOfertaAcademicaTodos);
router.post("/create", createOfertaAcademica); 
router.put("/update/:idOfertaAcademica", updateOfertaAcademica);
router.delete("/delete/:idOfertaAcademica", deleteOfertaAcademica);

export default router;
