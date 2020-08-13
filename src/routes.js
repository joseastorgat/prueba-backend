
import  Router from 'express';
const router = Router();

import { helloWorld, getAllBooks, getBookById, createBook, updateBook, deleteBook } from './controllers.js';

router.get('/', helloWorld);
router.get('/allBooks/', getAllBooks);
router.get('/get/book/:id', getBookById);
router.post('/create/book', createBook);
router.put('/update/book/:id', updateBook)
router.delete('/put/book/:id', deleteBook);

export default router;