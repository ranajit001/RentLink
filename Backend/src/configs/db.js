import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();
let connection = null; // Store first connection

export async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('db connected...');
        
    } catch (error) {
        console.log(error);
        
    }

}

