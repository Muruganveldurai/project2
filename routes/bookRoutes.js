// routes/bookRoutes.js
const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Route to add a new book
router.post('/add', async (req, res) => {
    const { title, author, genre, price, publishedDate } = req.body;
    try {
        const newBook = new Book({
            title,
            author,
            genre,
            price,
            publishedDate
        });
        await newBook.save();
        res.status(201).json(newBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to get all books
router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to search books by title, author, or genre
router.get('/search', async (req, res) => {
    const { query } = req.query; // Search term from the query parameter
    try {
        const books = await Book.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { author: { $regex: query, $options: 'i' } },
                { genre: { $regex: query, $options: 'i' } }
            ]
        });
        res.status(200).json(books);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to get a book by ID
router.get('/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(book);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to edit a book by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json(updatedBook);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Route to delete a book by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(200).json({ message: 'Book deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
