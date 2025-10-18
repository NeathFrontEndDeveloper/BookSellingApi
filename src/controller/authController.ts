import { Request, Response } from "express";
import { registerService, loginService } from "@/service/authService";

export const registerController = async (req: Request, res: Response) => {
    const registerResult = await registerService(req, res);
    return registerResult;
};

export const loginController = async (req: Request, res: Response) => {
    const loginResult = await loginService(req, res);
    return loginResult;
};
