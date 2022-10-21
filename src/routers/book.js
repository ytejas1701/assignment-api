import express from "express";
import auth from '../middleware/auth.js'
import validateFields from "../middleware/validateFields.js";
import Book from '../models/book.js';

const router = new express.Router();

// create book
router.post('/book',
    auth,
    async ({ body }, res)=>{
        try{
            const newBook = await new Book(body).save();

            res.status(201).send(newBook);

        }catch(error){
            res.status(400).send(error.message);
        }
    });

// get all books 
router.get('/book',
    auth,
    async (req, res)=>{
        try{
            const books = await Book.find({});

            res.status(200).send(books);

        }catch(error){
            res.status(500).send(error.message);
        }
     });

// get a book by id
router.get('/book/:id',
    auth,
    async ({ params }, res)=>{
        try{
            const book = await Book.findById(params.id);

            if(!book) throw new Error("invalid id");

            res.status(200).send(book);

        }catch(error){
            res.status(500).send(error.message);
        }
    });

// update a book
router.patch('/book/:id',
    auth,
    validateFields,
    async ({ params, body }, res)=>{
        try{
            const book = await Book.findByIdAndUpdate(params.id, 
                body, {
                new: true, 
                // runValidators: true
            });

            if(!book) throw new Error("invalid id");

            res.send(book);

        }catch(error){
            res.status(400).send(error.message);
        }
    });

// delete a book
router.delete('/book/:id',
    auth,
    async ({ params }, res)=>{
        try{
            const book = await Book.findByIdAndDelete(params.id);
            
            if(!book)throw new Error("invalid id");
            
            res.send(book);

        }catch(error){
            res.status(500).send(error.message);
        }
    });

export default router;
