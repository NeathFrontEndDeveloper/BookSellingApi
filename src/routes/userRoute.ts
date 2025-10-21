import { Router } from "express";
import { getAllUsersController } from "@/controller/userController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const userRouter = Router();

userRouter.get("/users", authMiddleware, checkRoleMiddleware("admin"), getAllUsersController);

export default userRouter;
