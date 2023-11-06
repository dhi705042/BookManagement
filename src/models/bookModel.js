const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    // userId: {
    //     type: ObjectId,
    //     required: true,
    //     ref: 'user'
    // },
    author: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })

module.exports = mongoose.model('book', bookSchema)