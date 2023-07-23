import Book from "../models/booksModel";
import { Request, Response } from "express";
import { validateCreateBook } from "../utilities/validation/book.validation";


export const createBook = async(req:Request, res:Response) =>{
    try{
        const { error } = validateCreateBook(req.body);
        if (error) return res.status(400).json({message:error.details[0].message})
    const {title, description, page_count} = req.body
    const findBook = await Book.findOne({title})
    if(findBook){
        return res.status(400).json({
            message: `Book already exist`
        })
    }   
    if(!findBook){
    
        let newBook = await Book.create({
            title,
            description,
            page_count
        })
            return res.status(200).json({
                message:`Book created successfully!`,
                book:newBook
            })
    }
        return res.status(401).json({
            message:`Unable to create book`
        })
    

}catch(err){
    return res.status(500).json({
        message:'Internal Server Error',
        Error: '/books/create'
    })
}
}

export const getAllBooks = async(req:Request, res:Response) =>{
    try {
        const allBooks = await Book.find({})
        if(!allBooks){
            return res.status(404).json({
                message: `Books not found`
            })
        }
        
            return res.status(200).json({
                message: `Books fetched successfully!`,
                allBooks
            })
        
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/Books/login'
        })
    }
}

export const getOneBook = async(req:Request, res:Response) =>{
    try {
        const {_id} = req.body;
        const oneBook = await Book.findOne({_id})
        // console.log(oneUser);
        
        if(!oneBook){
            return res.status(404).json({
                message: `Book not found`
            })
        }
        
            return res.status(200).json({
                message: `Book fetched successfully!`,
                oneBook
            })
        
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/Books/login'
        })
    }
}


export const updateBook = async(req:Request, res:Response) =>{
    try {
        const {title, description, page_count} = req.body;
        const book = await Book.findOne({title})
        
        if(!book){
            return res.status(404).json({
                message: `Book does not exist`
            })
        }
        
        const updatedBook = await Book.findOneAndUpdate({title}, {description, page_count})
        console.log(req.body);

       if (updatedBook){
        return res.status(200).json({
            message: `book updated successfully!`,
            updatedBook
        })
       } return res.status(401).json({
        message: `Error updating book`
    })
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/Books/login'
        })
    }
}


export const deleteBook = async(req:Request, res:Response) =>{
    try {
        const {title} = req.body;
        const deletedBook = await Book.findOneAndDelete({title})

        if (!deletedBook){
            return res.status(400).json({
                message: `Book does not exist`
            })
        }
        if (deletedBook){
            return res.status(200).json({
                message: `book deleted successfully!`,
                deletedBook
            })
        }
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/Books/login'
        })
    }
}

export const getByPage = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.params.page) || 1; 
      const limit = 5;
  
      const offset = (page - 1) * limit;
  
      const books = await Book.find()
        .skip(offset)
        .limit(limit);
  
      const count = await Book.countDocuments();
      const totalPages = Math.ceil(count / limit);
  
      res.json({
        books,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      res.status(500).send({ message: `Couldn't retrieve book information` });
    }
}