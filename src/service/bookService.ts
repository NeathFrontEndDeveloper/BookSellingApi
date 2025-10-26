import { Request, Response } from "express";
import { bookModel } from "@/models/bookModel";
import { CreateBookInput, IBook } from "@/types/bookType";
import { handleError } from "@/constant/handleError";

// Get All Books
export const getBookService = async (req: Request, res: Response) => {
    try {
        const bookData = req.body;
        const books = await bookModel.find({bookData});
        return res.status(200).json({
            success: true,
            message: "Books fetched successfully.",
            data: books,
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return handleError(res, 500, "Fetch books failed.");
    }
};

// Get a single book by ID
export const getBookByIdService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id);

        if (!book) {
            return handleError(res, 404, "Book not found");
        }

        return res.status(200).json({
            success: true,
            message: "Book fetched successfully.",
            data: book,
        });

    } catch (error) {
        console.error("Error fetching book by ID:", error);
       return handleError(res, 500, "Failed to fetch book");
    }
};

// Create new Book
export const createBookService = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const existingBook = await bookModel.findOne({ title });

        if (existingBook) {
           return handleError(res, 400, "Book already exist")
        }

        const bookData: CreateBookInput = req.body;
        const newBook = new bookModel(bookData);
        const savedBook = await newBook.save();

        return res.status(201).json({
            success: true,
            message: "Book created successfully.",
            data: savedBook,
        });
    } catch (error) {
        console.error("Error creating book:", error);
        return handleError(res, 500, "Failed to creating book");
    }
};

// Update Book
export const updateBookService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const updateData: IBook = req.body;

        const updatedBook = await bookModel.findByIdAndUpdate(id, updateData, {
            new: true,
            runValidators: true,
        });

        if (!updatedBook) {
           return handleError(res, 404, "Book not found.");
        }

        return res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            data: updatedBook,
        });
    } catch (error) {
        console.error("Error updating book:", error);
        return handleError(res, 500, "Failed to update book.");
    }
};

// Delete Book
export const deleteBookService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return handleError(res, 404, "Book not found")
        }

        return res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
        console.error("Error deleting book:", error);
        return handleError(res, 500, "Failed to delete book");
    }
};
