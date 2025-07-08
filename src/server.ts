/* eslint-disable no-console */ // 👉 ESLint যাতে console.log নিয়ে warning না দেয়

import { Server } from "http";
import mongoose from "mongoose";
import app from "./app"; //
import { envVars } from "./app/config/env"; //

let server: Server; // 👉 Server কে বাইরের scope এ রাখা হয়েছে যাতে দরকারে বন্ধ করা যায়

// 🔰 অ্যাপ চালু করার মূল ফাংশন
const startServer = async () => {
    try {
        // ✅ MongoDB ডাটাবেজে কানেক্ট
        await mongoose.connect(envVars.DB_URL);
        console.log("Connected to DB!!");

        // ✅ সার্ভার শুরু হচ্ছে নির্ধারিত পোর্টে
        server = app.listen(envVars.PORT, () => {
            console.log(`Server is listening to port ${envVars.PORT}`);
        });

    } catch (error) {
        // ❌ কানেকশন ফেল হলে লগ করবে
        console.log(error);
    }
};

startServer(); // 🔄 ফাংশনটি চালু করা হচ্ছে

// 🚦 SIGTERM signal: ক্লাউড প্রোভাইডার (e.g., Heroku, Render) থেকে shutdown সিগন্যাল পেলে
process.on("SIGTERM", () => {
    console.log("SIGTERM signal received... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1); // 👉 বন্ধ হয়ে যাচ্ছে
        });
    }

    process.exit(1);
});

// 🚦 SIGINT signal: লোকাল কম্পিউটার থেকে Ctrl+C দিলে
process.on("SIGINT", () => {
    console.log("SIGINT signal received... Server shutting down..");

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
});

// ❗ unhandledRejection: কোনো async কোডে .catch() না দিলে এইখানে ধরা পড়ে
process.on("unhandledRejection", (err) => {
    console.log("Unhandled Rejection detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
});

// ❗ uncaughtException: যেকোনো synchronous error try/catch ছাড়া ঘটলে এখানে ধরা পড়ে
process.on("uncaughtException", (err) => {
    console.log("Uncaught Exception detected... Server shutting down..", err);

    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }

    process.exit(1);
});

// 🧪 উদাহরণ:
// Promise.reject(new Error("I forgot to catch this promise"))  // 👉 এটি unhandledRejection দেখাবে
// throw new Error("I forgot to handle this local error")       // 👉 এটি uncaughtException ধরবে

/**
 * 🔍 Error Handling Summary:
 * - unhandledRejection: async কোডে .catch() না থাকলে
 * - uncaughtException: synchronous কোডে try/catch না থাকলে
 * - SIGINT: Ctrl + C দিলে
 * - SIGTERM: প্রোডাকশন সার্ভারে ক্লাউড অ্যাকশন থেকে
 */
