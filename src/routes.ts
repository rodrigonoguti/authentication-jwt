import { Router } from "express";
import { UserController } from "./controllers/UserController"
import { Auth as auth } from "./middlewares/Auth"

const router = Router();

const userController = new UserController();

router.get("/users", auth, userController.list)
router.post("/users", userController.create);
router.post("/authenticate", userController.authenticate);

export { router };