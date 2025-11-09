import jwt, { SignOptions } from "jsonwebtoken";
import { tokenPayload } from "@/types/auth-types";

const ACCESS_TOKEN_SECRET = process.env.JWT_ACCESS_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.JWT_REFRESH_SECRET as string;


if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("JWT secrets are not configured in environment variables.");
}

/**
 * Generate Access and Refresh JWT tokens
 * @param payload - user payload for token
 * @returns { accessToken, refreshToken }
 */

export const generateTokens = (payload: tokenPayload) => {
    // access token options
    const accessTokenOptions: SignOptions = {
        expiresIn: (process.env.JWT_ACCESS_EXPIRES || "15m") as SignOptions["expiresIn"],
    };

    // refresh token options
    const refreshTokenOptions: SignOptions = {
        expiresIn: (process.env.JWT_REFRESH_EXPIRES || "7d") as SignOptions["expiresIn"],
    };

    // Access token short live
    const accessToken = jwt.sign(
       {
        _id: payload._id,
        email: payload.email,
        role: payload.role,
       }, 
       ACCESS_TOKEN_SECRET,
       accessTokenOptions
    );

    // Refresh token long live
    const refreshToken = jwt.sign(
        {
         _id: payload._id,
         email: payload.email,
         role: payload.role,
        }, 
        REFRESH_TOKEN_SECRET,
        refreshTokenOptions
     );

    return { accessToken, refreshToken };
}

