import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log("MongoDB connected successfully!");
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
    mongoose.connection.on("error", (err) => {
        console.log("MongoDB connection error:", err);
    });
};

export default connectDB;