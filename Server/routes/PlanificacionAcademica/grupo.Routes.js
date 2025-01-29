import { Router } from "express"
import { createGrupo, deleteGrupo, getGruposTodos, updateGrupo }
 from "../../controllers/PlanificacionAcademica/grupo.Controller.js";

const router = Router();

router.get("/",getGruposTodos );
router.post("/create",createGrupo );
router.put("/update/:idGrupo", updateGrupo);
router.delete("/delete/:idGrupo", deleteGrupo);

export default router;
