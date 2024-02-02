// controllers/reviewController.js
const express = require('express');
const bookService = require('../services/bookService');
const router = express.Router();

router.post('/addReview/:bookId', isAuthenticated, async (req, res) => {
    const { bookId } = req.params;
    const { review } = req.body;

    try {
        const updatedBook = await bookService.addReview(bookId, review);
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.put('/modifyReview/:bookId', isAuthenticated, async (req, res) => {
    const { bookId } = req.params;
    const { newReview } = req.body;

    try {
        const updatedBook = await bookService.modifyReview(bookId, newReview);
        res.status(200).json(updatedBook);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.status(401).json({ message: 'Unauthorized' });
}

module.exports = router;
