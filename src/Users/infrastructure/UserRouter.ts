import { Router } from "express";
import { createUserController, byIdUserController } from "./dependencies";

const userRouter = Router();

userRouter.post('/', createUserController.run.bind(createUserController));
userRouter.get('/:id', byIdUserController.run.bind(byIdUserController));

export default userRouter;
