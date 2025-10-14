import express from "express";
import { createBook, getBook } from "@/controller/bookController";

const router = express.Router();

router.post("/create-book", createBook);
router.get("/books", getBook);

export default router;
