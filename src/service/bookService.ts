import { Request, Response } from "express";
import { bookModel } from "@/models/bookModel";
import { CreateBookInput, IBook } from "@/types/bookType";

// Get All Books
export const getBookService = async (req: Request, res: Response) => {
    try {
        const books = await bookModel.find();
        return res.status(200).json({
            success: true,
            data: books,
            message: "Books fetched successfully.",
        });
    } catch (error) {
        console.error("Error fetching books:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to fetch books.",
        });
    }
};

// Get a single book by ID
export const getBookByIdService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const book = await bookModel.findById(id);

        if (!book) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Book not found. Or has been deleted.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Book fetched successfully.",
            data: book,
        });
    } catch (error) {
        console.error("Error fetching book by ID:", error);
        return res.status(500).json({ message: "Failed to fetch book." });
    }
};

// Create new Book
export const createBookService = async (req: Request, res: Response) => {
    try {
        const { title } = req.body;
        const existingBook = await bookModel.findOne({ title });

        if (existingBook) {
            return res.status(400).json({message: "Book already exists!"});
        }

        const bookData: CreateBookInput = req.body;
        const newBook = new bookModel(bookData);
        const savedBook = await newBook.save();

        return res.status(201).json({
            success: true,
            data: savedBook,
            message: "Book created successfully.",
        });
    } catch (error) {
        console.error("Error creating book:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to create book.",
        });
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
            return res.status(404).json({
                success: false,
                data: null,
                message: "Book not found.",
            });
        }

        return res.status(200).json({
            success: true,
            data: updatedBook,
            message: "Book updated successfully.",
        });
    } catch (error) {
        console.error("Error updating book:", error);
        return res.status(500).json({
            success: false,
            data: null,
            message: "Failed to update book.",
        });
    }
};

// Delete Book
export const deleteBookService = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deletedBook = await bookModel.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({
                success: false,
                data: null,
                message: "Book not found.",
            });
        }

        return res.status(200).json({ message: "Book deleted successfully." });
    } catch (error) {
        console.error("Error deleting book:", error);
        return res.status(500).json({ message: "Failed to delete book." });
    }
};
