import { Request, Response } from "express";
import { getAllUserService, getUserByIdService, updatedUserByIdService, deleteUserByIdService, getMeService } from "@/service/userService";

export const getAllUserController = async ( req: Request, res: Response ) => {
    const getAllUserResult = await getAllUserService(req, res);
    return getAllUserResult;
}

export const getUserByIdController = async (req: Request, res: Response) => {
    const getUserByIdResult = await getUserByIdService(req, res);
    return getUserByIdResult;
}

export const updateUserController = async (req: Request, res: Response) => {
    const updatedUserResult = await updatedUserByIdService(req, res);
    return updatedUserResult;
}

export const deleteUserController = async (req: Request, res: Response) => {
    const deleteUserResult = await deleteUserByIdService(req, res);
    return deleteUserResult;
}

export const getMeController = async (req: Request, res: Response) => {
    const getMeResult = await getMeService(req, res);
    return getMeResult;
}