import { bookModel } from "@/models/bookModel";
import { BookResult, CreateBookInput } from "@/types/book";

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

export const getBookService = async (): Promise<BookResult[]> => {
  try {
    const books = await bookModel.find();
    return books.map((book) => ({
      success: true,
      data: book,
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    return [
      {
        success: false,
        data: null as any,
        message: "Failed to fetch books.",
      },
    ];
  }
};
