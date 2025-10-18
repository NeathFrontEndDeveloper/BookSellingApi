import { Request, Response } from "express";
import { getAllUsersService } from "@/service/userService";

export const getAllUsersController = async (req: Request, res: Response) => {
    const getAllUsersResult = await getAllUsersService(req, res);
    return getAllUsersResult;
}