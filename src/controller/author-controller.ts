import { Request, Response } from "express";
import { handleError } from "@/constant/handleError";
import { createAuthorService } from "@/service/author-service";

export const createAuthorController = async (req: Request, res: Response) => {
    try {
        const savedAuthor = await createAuthorService(req.body);
        return res.status(201).json({
            message: "Author created successfully",
            data: savedAuthor,
        });
    } catch (error) {
        console.log(error);
        return handleError(res, 500, "Failed to create authors");
    }
}