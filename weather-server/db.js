import mongoose from 'mongoose';
import dotenv from 'dotenv';
import config from '../config.js';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(config.mongoUri.uri);
        console.log(`MongoDB Connected`);
    } catch (error) {

        console.error(`Error: ${error.message}`);
    }
};

export default connectDB;