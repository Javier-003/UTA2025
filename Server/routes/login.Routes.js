import { Router } from "express"
import {accessLogin, logoutLogin} from "../controllers/login.Controller.js";

const router = Router();

router.post("/access",accessLogin)
router.post("/logout",logoutLogin)

export default router;