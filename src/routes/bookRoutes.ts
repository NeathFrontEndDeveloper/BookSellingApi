import express from "express";
import { createBookController, getBookController, updatedBookController, deleteBookController, getBookByIdController } from "@/controller/bookController";

const bookRouter = express.Router();

bookRouter.delete("/delete-book/:id", deleteBookController);
bookRouter.put("/updated-Book/:id", updatedBookController)
bookRouter.post("/create-book", createBookController);
bookRouter.get("/books/:id", getBookByIdController);
bookRouter.get("/books", getBookController);

export default bookRouter;
