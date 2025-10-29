import { Request, Response } from "express";
import { getCategoriesService, createCategoryService, updatedCategoryService, getCategoriesByIdService } from "@/service/categoryService";

// Get Categories
export const getCategoriesController = async (req: Request, res: Response) => {
    const getCategoriesResult = await getCategoriesService(req, res);
    return getCategoriesResult;
};

// Get Categories By ID
export const getCategoryByIdController = async (req: Request, res: Response) => {
    const getCategoryByIdResult = await getCategoriesByIdService(req, res);
    return getCategoryByIdResult;
}

// Create categories
export const createCategoriesController = async (req: Request, res: Response ) => {
    const createCategoryResult = await createCategoryService(req, res);
    return createCategoryResult;
}

// update category
export const updatedCategoryController = async (req: Request, res: Response) => {
    const updatedCategory = await updatedCategoryService(req, res);
    return updatedCategory;
}