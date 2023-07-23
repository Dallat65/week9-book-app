import express from "express";
import dotenv from "dotenv"
import cookieparser from "cookie-parser"
import logger from "morgan";
import cors from "cors";
import { connectDatabase } from "./config/database";
import userRoutes from './routes/userRoutes';
import bookRoutes from './routes/bookRoutes';
import { dbConnect } from "./config/mongoDBmemoryconnection";

dotenv.config()

const app = express();

if(process.env.NODE_ENV === "test"){
    dbConnect()
}else{
    connectDatabase()
}

// connectDatabase()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieparser())
app.use(logger('dev'))
app.use('/users', userRoutes)
app.use('/books', bookRoutes)

export default app;

