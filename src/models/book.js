import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        trim: true,
    },
    imageURL: { 
        type: String,
        required: true,
        trim: true,
    },
    author: { 
        type: String,
        required: true, 
    },
    pages:{
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required:true,
    }
});

const Book = mongoose.model('Book', bookSchema);

export default Book;