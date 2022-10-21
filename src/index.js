import express from 'express';
import cors from 'cors';

import './db/connect.js' 

import userRouter from './routers/user.js'
import bookRouter from './routers/book.js'

const app = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.use(userRouter);
app.use(bookRouter);

app.listen(port, ()=>console.log(`server running on port ${port}`));