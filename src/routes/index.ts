import { Router } from "express";
import AuthRouter from "./authRoute";
import bookRouter from "./bookRoutes";
import userRouter from "./userRoute";

const router = Router();

router.use("/", bookRouter);
router.use("/books", bookRouter);
router.use("/create-book", bookRouter);
router.use("/updated-book", bookRouter);
router.use("/delete-book", bookRouter);

// Auth route
router.use("/auth", AuthRouter);

// Users Routes
router.use("/", userRouter);

export default router;
