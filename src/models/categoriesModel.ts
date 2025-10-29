import mongoose, { Types, Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    _id: Types.ObjectId;
    name: string;
    des: string;
}

const categoriesSchema = new Schema<ICategory>({
    name: { type: String, required: true, unique: true },
    des: { type: String, required: true },
})

export const CategoriesModel = mongoose.model<ICategory>("Categories", categoriesSchema);