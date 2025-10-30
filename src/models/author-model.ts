import mongoose, { Schema, Document } from "mongoose";

interface IAuthor extends Document {
    name: string;
    phone: string;
    dob: Date;
}
const authorSchema = new Schema<IAuthor>({
    name: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    dob: { type: Date },
},
    { timestamps: true }
);

export const authorModel = mongoose.model<IAuthor & Document>("Author", authorSchema);