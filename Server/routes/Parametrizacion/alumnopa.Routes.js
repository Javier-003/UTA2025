import { Router } from "express";

import { createAlumnopa, deleteAlumnopa, getAlumnopatodos, updateAlumnopa, transaccionUpdateAlumnopa } 
from "../../controllers/Parametrizacion/alumnopa.Controller.js";

import bitacora from "../../middleware/bitacora.js";

const router = Router();

router.get("/",getAlumnopatodos );
router.post("/create", bitacora('Creación', 'Se agrego un Alumno Programa Academico'), createAlumnopa);
router.put("/update/:idAlumnoPA", bitacora('Actualización', 'Se actualizo un Alumno Programa Academico'), updateAlumnopa );
router.delete("/delete/:idAlumnoPA", bitacora('Eliminación', 'Se elimino un Alumno Programa Academico'),  deleteAlumnopa);

//TRANSACCIÓN
router.put("/update2/:idAlumnoPA", bitacora('Actualización', 'Se actualizo un Alumno Programa Academico y estatus kardex'), transaccionUpdateAlumnopa);


export default router;
