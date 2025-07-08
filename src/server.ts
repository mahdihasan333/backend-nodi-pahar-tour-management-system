
import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";
import { Server } from 'http';

dotenv.config();

let server: Server;


const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
        console.log('✅ Connected to DB!!')

        const port = process.env.PORT || 5000;
        server = app.listen(port, () => {
            console.log(`🚀 Server is listening on port ${port}`)
        });

    } catch (error) {
        console.error('❌ DB Connection Failed:', error)
    }
}

startServer();


