import { Request, Response } from "express";
import { userModel } from "@/models/userModel";

export const getAllUsersService = async (req: Request, res: Response) => {
    try {
        const users = await userModel.find();
        return res.status(200).json({
            success: true,
            message: "Get users successfully.",
            data: users,
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Something went wrong."});
    }
}