import express from "express";
import { createBookController, getBookController, updatedBookController } from "@/controller/bookController";

const router = express.Router();

router.put("/updated-Book/:id", updatedBookController)
router.post("/create-book", createBookController);
router.get("/books", getBookController);

export default router;
