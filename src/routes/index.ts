import { Router } from "express";
import AuthRouter from "./authRoute";
import bookRouter from "./bookRoutes";
import userRouter from "./userRoute";
import categoriesRouter from "./categoriesRoute";
import AuthorRouter from "./authRoute";

const router = Router();

router.use("/", bookRouter);

// Auth route
router.use("/auth", AuthRouter);

// Users Routes
router.use("/", userRouter);

// categoriesRouter
router.use("/", categoriesRouter);

// AuthorRouter
router.use("/", AuthorRouter);

export default router;
