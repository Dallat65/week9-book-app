import express from "express";
import { createBook, deleteBook, getAllBooks, getOneBook, updateBook, getByPage } from "../controllers.ts/bookscontroller";
import { auth } from "../utilities/auth";


const router = express.Router()

router.post('/create',auth, createBook)
router.get('/getAllBooks',auth, getAllBooks)
router.get('/getOneBook',auth, getOneBook)
router.put('/updateBook',auth, updateBook)
router.delete('/deletingBook',auth, deleteBook)
router.get('/getByPage/:page?',auth, getByPage)



export default router;