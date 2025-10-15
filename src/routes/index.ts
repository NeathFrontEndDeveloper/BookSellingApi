import { Router } from "express";
import bookRoute from "./bookRoutes";

const router = Router();

router.use("/", bookRoute);
router.use("/create-book", bookRoute);
router.use("/updated-book", bookRoute);

export default router;
