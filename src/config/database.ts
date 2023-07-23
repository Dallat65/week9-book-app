import mongoose from "mongoose";


export const connectDatabase = async() =>{
    try {
        const connect = mongoose.connect(`mongodb+srv://Dallat:Daniely65@cluster1.dllpieg.mongodb.net/Week9`)
        console.log(`mongoDB connected successfully!`);
        
    } catch (err) {
        console.log(err);
        
    }
}
