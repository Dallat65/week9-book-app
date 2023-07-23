import User from "../models/userModel";
import { Request, Response, NextFunction } from "express";
import { SaltGenerator, passwordGenerator, hashPassword, tokenGenerator } from "../utilities/utility";
import { emailHtml, sendmail } from "../utilities/notification";
import bcrypt from "bcryptjs"
import dotenv from "dotenv"
import { validateCreateUser, validateLogin } from "../utilities/validation/user.validation";

dotenv.config()

export const createUser = async(req:Request, res:Response, next:NextFunction) =>{
    try{
        const { error } = validateCreateUser(req.body);
        if (error) return res.status(400).json({message:error.details[0].message})

    const {firstName, lastName, email} = req.body
    const findUser = await User.findOne({email})
    if(findUser){
        return res.status(400).json({
            message: `User already exist`,
            status: 'error',
            method: req.method
        })
    }    
    const salt = await SaltGenerator()
    
    const password = process.env.NODE_ENV === "test"?`${lastName}27966`: await passwordGenerator(lastName)
    const hashedPassword = await hashPassword(password, salt)
    if(!findUser){
        let newUser = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            role:'Author',
            books: []
        })
            let html = emailHtml(email, password)
            await sendmail(`${process.env.GMAIL_USERNAME}`, email, "Welcome!", html)
            return res.status(200).json({
                message:`User created successfully!`,
                role: newUser.role,
                user:newUser,
                status: 'success',
                method: req.method
            })
        }
        return res.status(401).json({
            message:`Unable to create user`,
            status: 'error',
            method: req.method
        })
    

}catch(err){
    return res.status(500).json({
        message:'Internal Server Error',
        Error: '/users/create',
        err
    })
}
}

export const login = async(req:Request, res:Response) =>{
    try {
        const { error } = validateLogin(req.body);
        if (error) return res.status(400).json({message:error.details[0].message})

        const {email, password} = req.body;
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                message: `User does not exist, please register`,
                status: 'error',
                method: req.method
            })
        }
        if(user){
            const validate = await bcrypt.compare(password, user.password)
            if (!validate){
                return res.status(400).json({
                    message: `Invalid password`,
                    status: 'error',
                    method: req.method
                })
            }
            if(validate){
                const token = await tokenGenerator(`${user._id}`);
                console.log(token)
                res.cookie(`token`, token)
                
                
                return res.status(200).json({
                    message: `Login successful`,
                    email: user.email,
                    token: token,
                    status: 'success',
                    method: req.method
                })
            }
        }
    } catch(err){
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/users/login'
        })
    }
}

export const getAll = async(req:Request, res:Response) =>{
    try {
        const allUsers = await User.find({})
        if(!allUsers){
            return res.status(404).json({
                message: `Users not found`,
                status: 'error',
                method: req.method
            })
        }
        
            return res.status(200).json({
                message: `Users fetched successfully!`,
                allUsers,
                status: 'success',
                method: req.method
            })
        
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/users/login'
        })
    }
}

export const getOneUser = async(req:Request, res:Response) =>{
    try {
        const {_id} = req.body;
        const oneUser = await User.findOne({_id})
        console.log(oneUser);
        
        if(!oneUser){
            return res.status(404).json({
                message: `User not found`,
                status: 'error',
                method: req.method
            })
        }
        
            return res.status(200).json({
                message: `User fetched successfully!`,
                oneUser,
                status: 'success',
                method: req.method
            })
        
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/users/login'
        })
    }
}


export const updateUser = async(req:Request, res:Response) =>{
    try {
        const {email, firstName, lastName} = req.body;
        const user = await User.findOne({email})
        
        if(!user){
            return res.status(404).json({
                message: `User does not exist`,
                status: 'error',
                method: req.method
            })
        }
        
        const updatedUser = await User.findOneAndUpdate({email}, {firstName, lastName})
        console.log(req.body);

       if (updatedUser){
        return res.status(200).json({
            message: `user updated successfully!`,
            updatedUser,
            status: 'success',
            method: req.method
        })
       } return res.status(401).json({
        message: `Error updating user`,
        status: 'error',
        method: req.method
    })
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/users/login'
        })
    }
}

export const deleteUser = async(req:Request, res:Response) =>{
    try {
        const {email} = req.body;
        const deletedUser = await User.findOneAndDelete({email})

        if (!deletedUser){
            return res.status(400).json({
                message: `User does not exist`,
                status: 'error',
                method: req.method
            })
        }
        if (deletedUser){
            return res.status(200).json({
                message: `user deleted successfully!`,
                deletedUser,
                status: 'success',
                method: req.method
            })
        }
    } catch (err) {
        return res.status(500).json({
            message:'Internal Server Error',
            Error: '/users/login'
        })
    }
}

export const getByPage = async (req: Request, res: Response) => {
    try {
      const page = parseInt(req.params.page) || 1; 
      const limit = 5;
  
      const offset = (page - 1) * limit;
  
      const users = await User.find()
        .skip(offset)
        .limit(limit);
  
      const count = await User.countDocuments();
      const totalPages = Math.ceil(count / limit);
  
      res.json({
        users,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      res.status(500).send({ message: `Couldn't retrieve user information` });
    }
}