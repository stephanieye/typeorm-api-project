import { Router } from "express";
import AuthController from "../controllers/AuthController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkIsUser } from "../middlewares/checkIsUser";

const router = Router();

router.post("/login", AuthController.login);

router.post("/change-password", [checkJwt], AuthController.changePassword);

export default router;