import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from 'dotenv';

dotenv.config()

export const SaltGenerator = async () =>{
    return bcrypt.genSalt()
}

export const passwordGenerator = async(lastName:string)=>{
    const mixup = lastName += Math.floor(1000+ Math.random()* 95000)
    return mixup
}

export const hashPassword = async(password:string, salt:string) =>{
    return await bcrypt.hash(password, salt)
}

export const tokenGenerator = async(id:string) =>{
    return await jwt.sign({id}, `${process.env.APP_SECRET}`, {expiresIn: `1d`})
}