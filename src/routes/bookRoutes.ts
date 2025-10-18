import express from "express";
import { authMiddleware, checkRoleMiddleware } from "@/middleware/authMiddleware";
import { createBookController, getBookController, updatedBookController, deleteBookController, getBookByIdController } from "@/controller/bookController";

const bookRouter = express.Router();

bookRouter.delete("/delete-book/:id", authMiddleware, checkRoleMiddleware("admin"), deleteBookController);
bookRouter.put("/updated-Book/:id", authMiddleware, checkRoleMiddleware("admin"), updatedBookController)
bookRouter.post("/create-book", authMiddleware, checkRoleMiddleware("admin"), createBookController);
bookRouter.get("/books/:id", authMiddleware, checkRoleMiddleware("admin"), getBookByIdController);
bookRouter.get("/books", authMiddleware, checkRoleMiddleware("admin"), getBookController);


export default bookRouter;
