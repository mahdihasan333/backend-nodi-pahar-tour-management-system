
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


process.on("SIGTERM", () => {
    console.log("SIGTERM signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("SIGINT", () => {
    console.log("SIGINT signal recieved... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})


process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejecttion detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1)
        });
    }

    process.exit(1)
})

// Unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local erro")


/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */