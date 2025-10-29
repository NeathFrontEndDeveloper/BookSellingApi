import { Router } from "express";
import { getCategoriesController, createCategoriesController, updatedCategoryController, getCategoryByIdController } from "@/controller/categoriesController";

const categoriesRouter = Router();

categoriesRouter.get("/categories", getCategoriesController);
categoriesRouter.get("/categories/:id", getCategoryByIdController);
categoriesRouter.put("/updated-categories/:id", updatedCategoryController);
categoriesRouter.post("/create-category", createCategoriesController);

export default categoriesRouter;