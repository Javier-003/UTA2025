import { Router } from "express";

import { createProgramaAcademico, deleteProgramaAcademico, getProgramaAcademico, updateProgramaAcademico }
from "../../controllers/PlanificacionAcademica/programa_academico.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/", getProgramaAcademico);
router.post("/create", bitacora('Creación', 'Se agrego un Programa Académico'), createProgramaAcademico);
router.put("/update/:idProgramaAcademico", bitacora('Actualización', 'Se actualizo un Programa Académico'), updateProgramaAcademico);
router.delete("/delete/:idProgramaAcademico", bitacora('Eliminación', 'Se elimino un Programa Académico'), deleteProgramaAcademico );

export default router;
