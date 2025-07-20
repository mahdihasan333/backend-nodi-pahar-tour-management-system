import dotenv from "dotenv";
dotenv.config(); // 🔹 .env ফাইল থেকে environment variables লোড করছে

interface EnvConfig {
    PORT: string,
    DB_URL: string,
    NODE_ENV: "development" | "production",
    BCRYPT_SALT_ROUND : string,
    JWT_ACCESS_EXPIRES: string,
    JWT_ACCESS_SECRET: string,
}

// 🔰 এই ফাংশনটি প্রয়োজনীয় environment variables গুলো validate করে,
//    এবং না থাকলে error দেয়, আর থাকলে টাইপসহ return করে
const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariables: string[] = ["PORT", "DB_URL", "NODE_ENV", "BCRYPT_SALT_ROUND", "JWT_ACCESS_EXPIRES", "JWT_ACCESS_SECRET"]; // 🔹 আবশ্যক ভ্যারিয়েবলগুলোর লিস্ট

    requiredEnvVariables.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`); // 🔸 কোনো ভ্যারিয়েবল না থাকলে error
        }
    });

    return {
        PORT: process.env.PORT as string,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        DB_URL: process.env.DB_URL!, // 🔸 নিশ্চিতভাবে আছে বলেই non-null assertion (!)
        NODE_ENV: process.env.NODE_ENV as "development" | "production",
        BCRYPT_SALT_ROUND : process.env.BCRYPT_SALT_ROUND as string,
        JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
        JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    };
};

export const envVars = loadEnvVariables(); // 🔹 validated env config export করা হচ্ছে
