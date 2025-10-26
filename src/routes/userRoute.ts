import { Router } from "express";
import {
    getAllUserController,
    getUserByIdController,
    deleteUserController,
    updateUserController,
    getMeController,
} from "@/controller/userController";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";

const userRouter = Router();

// Get all users (admin only)
userRouter.get("/users", authMiddleware, checkRoleMiddleware("admin"), getAllUserController);

// Get specific user by ID (admin only)
userRouter.get("/users/:id", authMiddleware, checkRoleMiddleware("admin"), getUserByIdController);

// Update user (admin only)
userRouter.put("/updated-users/:id", authMiddleware, checkRoleMiddleware("admin"), updateUserController);

// Delete user (admin only)
userRouter.delete("/deleted-users/:id", authMiddleware, checkRoleMiddleware("admin"), deleteUserController);

// ✅ Get currently logged-in user
userRouter.get("/users/profile/me", authMiddleware, getMeController);

export default userRouter;
