import { Router, Response } from "express";
import UserController from "../controllers/UserController";
import { checkJwt } from "../middlewares/checkJwt";
import { checkPrivateRoute } from "../middlewares/checkPrivateRoute";

const router = Router();

router.get("/", UserController.listAll);

router.get('/:id', checkJwt, UserController.getOneById
);

router.post("/", UserController.newUser);

router.patch('/:id', [checkJwt, checkPrivateRoute],
UserController.editUser
);

router.delete('/:id', [checkJwt, checkPrivateRoute],
UserController.deleteUser
);

export default router;