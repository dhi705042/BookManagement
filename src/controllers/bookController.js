const mongoose = require('mongoose');
const bookModel = require('../models/bookModel');
const ObjectId = mongoose.Types.ObjectId

const validString = function (value) {
    return typeof value === 'string' && value.trim().length > 0;
};

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}


const createBook = async function (req, res) {
    try {
        const requestBody = req.body;

        if (!validString(requestBody.title) || !validString(requestBody.summary)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters" });
        }

        const { title, author, summary } = requestBody;

        const isTitleAlreadyPresent = await bookModel.findOne({ title });

        if (isTitleAlreadyPresent) {
            return res.status(400).send({ status: false, message: "Title already present" });
        }

        const newBook = await bookModel.create({
            title,
            author,
            summary,
        });

        res.status(201).send({ status: true, message: 'Book created successfully', data: newBook });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

const getBooks = async function (req, res) {
    try {
        const books = await bookModel.find({ isDeleted: false }).select({ _id: 1, title: 1, author: 1, summary: 1 });

        if (books.length === 0) {
            return res.status(404).send({ status: false, message: "No books found" });
        }

        const sortedBooks = books.sort((a, b) => a.title.toLowerCase() > b.title.toLowerCase() ? 1 : -1);

        res.status(200).send({ status: true, data: sortedBooks });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

const getBooksByID = async function (req, res) {
    try {
        const bookId = req.params.bookId;

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid bookId" });
        }

        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });

        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" });
        }

        res.status(200).send({ status: true, data: book });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

const updateBooks = async function (req, res) {
    try {
        const bookId = req.params.bookId;
        const requestBody = req.body;

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid bookId" });
        }

        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });

        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found" });
        }

        const { title, author, summary } = requestBody;

        if (!validString(title) || !validString(author) || !validString(summary)) {
            return res.status(400).send({ status: false, message: "Invalid request parameters" });
        }

        const isTitleAlreadyPresent = await bookModel.findOne({ title });

        if (isTitleAlreadyPresent && isTitleAlreadyPresent._id.toString() !== bookId) {
            return res.status(400).send({ status: false, message: "Title already present" });
        }

        const updatedBookData = await bookModel.findOneAndUpdate(
            { _id: bookId, isDeleted: false },
            {
                $set: {
                    title,
                    author,
                    summary,
                },
            },
            { new: true }
        );

        res.status(201).send({ status: true, message: 'Book updated successfully', data: updatedBookData });
    } catch (error) {
        res.status(500).send({ status: false, message: error.message });
    }
};

const deleteByBookId = async function (req, res) {
    try {
        const bookId = req.params.bookId;

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, message: "Invalid bookId" });
        }

        const book = await bookModel.findOne({ _id: bookId, isDeleted: false });

        if (!book) {
            return res.status(404).send({ status: false, message: "Book not found or already deleted" });
        }

        const deletedBook = await bookModel.findOneAndUpdate(
            { _id: bookId },
            { $set: { isDeleted: true, deletedAt: new Date() } },
            { new: true }
        );

        res.status(201).send({ status: true, message: "Book deleted successfully", data: deletedBook });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

module.exports = {
    createBook,
    getBooks,
    getBooksByID,
    updateBooks,
    deleteByBookId,
};
