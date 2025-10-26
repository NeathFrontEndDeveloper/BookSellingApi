import { Request, Response } from "express";
import { userModel } from "@/models/userModel";
import { handleError } from "@/constant/handleError";

// Get All users
export const getAllUserService = async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const user = await userModel.find({userData});
        if (!user) {
            return handleError(res, 404, "user not found");
        }

        res.status(200).json({
            message: "Get user successfully",
            data: user,
        })

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to fetch user.");
    }
}

// Get User by id
export const getUserByIdService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = await userModel.findById( id );

        if (!userId) {
            return handleError(res, 404, "User not found");
        }

        return res.status(200).json({
            message: "Get user successfully",
            data: userId,
        })


    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to fetch user.");
    }
}

// Delete User by id
export const deleteUserByIdService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteUser = await userModel.findByIdAndDelete( id );
        console.log("deleted User date:", deleteUser);

        if (!deleteUser) {
            return handleError(res, 404, "User not found");
        }

        return res.status(200).json({
            message: "Deleted user successfully",
        })

    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to delete user.");
    }
}

// Updated user by id
export const updatedUserByIdService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const updateUser = await userModel.findByIdAndUpdate( id, updateData, {
            new: true,
            runValidators: true,
        })

        if (!updateUser) {
            return handleError(res, 404, "User not found");
        }

        return res.status(200).json({
            message: "Updated user successfully",
            data: updateUser,
        })
    } catch (error) {
        console.error(error);
        return handleError(res, 500, "Failed to update user.");
    }
}

// Get me Service
export const getMeService = async (req: Request, res: Response) => {
    try {
        if (!req.user || !req.user._id) {
            return handleError(res,  401, "Unauthorized: No user found in token");
        }

        const userProfile = await userModel.findById(req.user._id).select("-password");

        if (!userProfile) {
            return handleError(res, 404, "User not found.");
        }

        return res.status(200).json({
            message: "Get user profile successfully",
            data: userProfile,
        })

    } catch (error) {
        console.log(error);
        return handleError(res, 500, "Failed to fetch me user.");
    }
}