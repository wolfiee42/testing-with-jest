import { model, Schema } from "mongoose";
import { IBook } from "../schema/book.schema";

const BookSchema = new Schema<IBook>({
    title: {
        type: String,
        required: [true, 'Provide a title.']
    },
    author: {
        type: String,
        required: [true, 'Provide an author.']
    },
    publishedYear: {
        type: Number,
        min: 1950,
        max: 2025
    },
    genre: String

});

export const Book = model<IBook>('Book', BookSchema)
