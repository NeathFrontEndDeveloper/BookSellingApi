import { Router } from "express";
import AuthRouter from "./authRoute";
import bookRouter from "./bookRoutes";
import userRouter from "./userRoute";

const router = Router();

router.use("/", bookRouter);

// Auth route
router.use("/auth", AuthRouter);

// Users Routes
router.use("/", userRouter);

export default router;
