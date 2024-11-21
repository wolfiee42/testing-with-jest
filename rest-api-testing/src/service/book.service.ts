import { Request, Response } from "express";
import { Book } from "../models/book.model";

const express = require('express');

const app = express();
app.use(express.json());


// Get all books
app.get('/books', async (req: Request, res: Response) => {
    const books = await Book.find();
    res.status(200).json(books);
});

// Get a book by ID
app.get('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(404).json({ message: 'Book not found' });
    }
});

// Create a new book
app.post('/books', async (req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        res.status(400).json({ message: 'Invalid book data' });
    }
});

// Update a book by ID
app.put('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ message: 'Invalid book data' });
    }
});

// Delete a book by ID
app.delete('/books/:id', async (req: Request, res: Response) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) return res.status(404).json({ message: 'Book not found' });
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(404).json({ message: 'Book not found' });
    }
});


export const BookService = app;