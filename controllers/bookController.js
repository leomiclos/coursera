// controllers/bookController.js
const express = require('express');
const bookService = require('../services/bookService');
const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const books = await bookService.getAllBooks();
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/isbn/:isbn', async (req, res) => {
    const isbn = req.params.isbn;
    try {
        const book = await bookService.getBookByISBN(isbn);
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({ message: 'Book not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/author/:author', async (req, res) => {
    const author = req.params.author;
    try {
        const books = await bookService.getBooksByAuthor(author);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.get('/review/:review', async (req, res) => {
    const review = req.params.review;
    try {
        const books = await bookService.getBooksByReview(review);
        res.status(200).json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res) => {
    const { title, isbn, author, review } = req.body;

    try {
        const book = await bookService.addBook(title, isbn, author, review);
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


router.post('/add', async (req, res) => {
    const { title, isbn, author, review } = req.body;

    try {
        const book = await bookService.addBook(title, isbn, author, review);
        res.status(201).json({ message: 'Book added successfully', book });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports = router;
