import mongoose, {Schema, Document} from "mongoose";
import {IUser} from "@/types/userType"

export interface IUserDocument extends Document {
    name: string;
    password: string;
    email: string;
    role?: string;
}
const userSchema = new Schema<IUser>({
    name: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    password: {type: String, required: true, trim: true },
    role: {type: String, default: "user"},
},
    { timestamps: true }
);

export const userModel = mongoose.model<IUser>("User", userSchema);

// export default userSchema;