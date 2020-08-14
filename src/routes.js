
import  Router from 'express';
const router = Router();

import { authMiddleware } from './auth/google-auth.js'

import { getAllBooks, getBookById, createBook, updateBook, deleteBook } from './controllers.js';
router.use(authMiddleware);
router.get('/allBooks/', getAllBooks);
router.get('/get/book/:id', getBookById);
router.post('/create/book', createBook);
router.put('/update/book/:id', updateBook)
router.delete('/delete/book/:id', deleteBook);

export default router;