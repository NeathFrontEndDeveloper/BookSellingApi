import { authorModel } from "@/models/author-model";
import { AuthorInput } from "@/types/author-type";

// create author
export const createAuthorService = async (authorData: AuthorInput) => {
    try {
            const { name } = authorData;
    
        const existingAuthor = await authorModel.findOne({ name });
        if (existingAuthor) {
            throw new Error("Author already exists");
        }
    
        const newAuthor = new authorModel(authorData);
        return await newAuthor.save();
    } catch (error) {
        throw error;
    }
};
