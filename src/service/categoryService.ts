import { Request, Response } from "express";
import { handleError } from "@/constant/handleError";
import { CategoriesModel } from "@/models/categoriesModel";
import { ICategory, CreateCategoriesInput } from "@/types/category-type";

// get category service
export const getCategoriesService = async ( _req: Request, res: Response ) => {
    try {
        const categoriesData = await CategoriesModel.find();

        if (!categoriesData) {
            return handleError(res, 404, "Category not found");
        }

        return res.status(200).json({
            message: "Get categories successfully",
            data: categoriesData
        })

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to get categories.")
    }
};

// Get categories by id
export const getCategoriesByIdService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const categoryId = await CategoriesModel.findById( id );

        if (!categoryId) {
            return handleError(res, 404, "Category not found");
        }

        return res.status(200).json({
            message: "Get categories successfully",
            data: categoryId
        })

    } catch (error) {
        console.error(error)
        return handleError(res, 500, "Failed to get categories.")
    }
}

// create categories
export const createCategoryService = async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        const existCategory = await CategoriesModel.findOne({ name });

        if (existCategory) {
            return handleError(res, 401, "Category already exists");
        }

        const categoryData: CreateCategoriesInput = req.body;
        const newCategory = new CategoriesModel(categoryData);
        const savedCategory = await newCategory.save();

        return res.status(201).json({
            message: "Successfully created category",
            data: savedCategory,
        });

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to create category.");
    }
};

// updated Category
export const updatedCategoryService =  async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updatedCategoryData: ICategory = req.body;

        const updatedCategory = await CategoriesModel.findByIdAndUpdate( id, updatedCategoryData, {
            new: true,
            runValidators: true,
        })

        if (!updatedCategory) {
            return handleError(res, 404, "No data found.")
        }

        return res.status(200).json({
            message: "Successfully updated category",
            data: updatedCategory
        })

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to update category");
    }
};

// delete category
export const deletedCategoriesById = async (req: Request, res: Response) => {
    try {
        const { id } = req.body;
        const deletedData = await CategoriesModel.findByIdAndDelete( id );

        if (!deletedData) {
            return handleError(res, 404, "Category not found");
        }

        return res.status(200).json({
            message: "Successfully deleted",
            // Optional but in this case I don't want it
            // data: deletedData,
        })
    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to delete category");
    }
}