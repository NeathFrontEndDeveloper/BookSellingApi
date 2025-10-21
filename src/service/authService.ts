import bcrypt from "bcrypt";
import { userModel } from "@/models/userModel";
import { generateToken } from "@/utils/generateToken";
import { Request, Response } from "express";
import { handleAuthError } from "@/constant/handleAuthError";

export const registerService = async (req: Request, res: Response) => {
    try {
        const { name, email, password, role } = req.body;

        // Check exist User
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return handleAuthError(res, 400, "User already exists");
        }

        // Hash password
        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel ({
            name,
            email,
            password: hashPassword,
            role: role || "user",
        });

        await newUser.save();

        const token = generateToken(
            newUser.id.toString(),
            newUser.email,
            newUser.role || "user",
        );

        return res.status(201).json({
            message: "Registered successfully.",
            data: {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    email: newUser.email,
                    role: newUser.role || "user",
                },
                token,
            },
        });

    } catch (error) {
        console.error(error);
        return handleAuthError(res, 500, "An error occurred during registration");
    }
};

export const loginService = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const loginUser = await userModel.findOne({ email });
        if (!loginUser) {
            return handleAuthError(res, 400, "Invalid credentials.");
        }

        const isValidPassword = await bcrypt.compare(password, loginUser.password);
        if (!isValidPassword) {
            return handleAuthError(res, 400, "Invalid credentials.");
        }
        const token = generateToken(
            loginUser.id.toString(),
            loginUser.email,
            loginUser.role || "user",
        );



        return res.status(200).json({
            message: "User login successfully",
            token,
            user: {
                id: loginUser.id,
                name: loginUser.name,
                email: loginUser.email,
                role: loginUser.role || "user",
            }
        })

    } catch (error) {
        console.error(error);
        return handleAuthError(res, 500, "Login false. Please try again later.");
    }
}
