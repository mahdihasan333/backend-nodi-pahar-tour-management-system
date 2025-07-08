/* eslint-disable no-console */
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "http";
import app from "./app";

dotenv.config(); // .env ফাইল থেকে config লোড

let server: Server;

const startServer = async () => {
  try {
    // 🔗 MongoDB connect
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("✅ Connected to MongoDB");

    const port = process.env.PORT || 5000;

    // 🚀 Express অ্যাপ লিসেন করছে
    server = app.listen(port, () => {
      console.log(`🚀 Server is running on port ${port}`);
    });
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
};

startServer();

/**
 * ---------- 🧠 GLOBAL ERROR HANDLERS ----------
 */

// ❗ Uncaught Exception (synchronous error)
process.on("uncaughtException", (err) => {
  console.log("💥 Uncaught Exception detected. Shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// ❗ Unhandled Promise Rejection (async error without .catch)
process.on("unhandledRejection", (err) => {
  console.log("💥 Unhandled Rejection detected. Shutting down...", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
});

// ⛔ SIGINT (Ctrl+C in terminal)
process.on("SIGINT", () => {
  console.log("🛑 SIGINT received. Shutting down gracefully...");

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});

// ⛔ SIGTERM (Cloud stop/restart signal)
process.on("SIGTERM", () => {
  console.log("🛑 SIGTERM received. Shutting down gracefully...");

  if (server) {
    server.close(() => {
      process.exit(0);
    });
  } else {
    process.exit(0);
  }
});


// Unhandler rejection error
// Promise.reject(new Error("I forgot to catch this promise"))

// Uncaught Exception Error
// throw new Error("I forgot to handle this local erro")


/**
 * unhandled rejection error
 * uncaught rejection error
 * signal termination sigterm
 */