import { bookModel } from "@/models/bookModel";
import { BookResult, CreateBookInput, IBook } from "@/types/bookType";

export const getBookService = async (): Promise<BookResult[]> => {
    try {
        const books = await bookModel.find();

        return books.map((book) => ({
            success: true,
            data: book,
            message: "Get Book Successfully.",
        }));
    } catch (error) {
        console.error("Error fetching books:", error);
        return [
            {
                success: false,
                data: null,
                message: "Failed to fetch books.",
            },
        ];
    }
};

export const createBookService = async (
    bookData: CreateBookInput
): Promise<BookResult> => {
    try {
        const newBook = new bookModel(bookData);
        const savedBook = await newBook.save();
        return {
            success: true,
            data: savedBook,
            message: "Book created successfully.",
        };
    } catch (error) {
        console.error("Error creating book:", error);
        return {
            success: false,
            data: null as any,
            message: "Failed to create book.",
        };
    }
};

export const updateBookService = async (id: string, updateData: IBook): Promise<BookResult> => {

    try {
        const updatedBook = await bookModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });

        if(!updatedBook) {
            return {
                success: false,
                data: updatedBook,
                message: "Book not found.",
            }
        }

        return {
            success: true,
            data: updatedBook,
            message: "Book updated successfully.",
        }


    } catch (error) {
        console.error("update Book Data", error);
        return {
            success: false,
            data: null,
            message: "Failed to update book.",
        }
    }

}