const BookController = require('../controllers/bookController');
const express = require('express');
const router = express.Router();


router.get('/test-me', function (req, res) {
    res.send('My first ever API!');
});

// Create Book API
router.post('/books', BookController.createBook);

// Get Books API
router.get('/books', BookController.getBooks);

// Get Book by ID API
router.get('/books/:bookId', BookController.getBooksByID);

// Update Book API
router.put('/books/:bookId', BookController.updateBooks);

// Delete Book API
router.delete('/books/:bookId', BookController.deleteByBookId);

module.exports = router;