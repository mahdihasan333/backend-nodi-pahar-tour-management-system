import express, { Request, Response } from 'express';
import cors from 'cors'
import { router } from './app/routes';

const app = express(); // 🔹 Express অ্যাপ ইনিশিয়ালাইজ করা হচ্ছে

app.use(express.json())
app.use(cors())


app.use('/api/v1', router)

// 🔰 রুট রাউট: ব্রাউজারে "/" ভিজিট করলে এই রেসপন্স পাওয়া যাবে
app.get('/', (req: Request, res: Response) => {
    res.status(200).json({
        message: 'Welcome to NodiPahar Tour Management System Backend' // 🔸 রেসপন্স ম্যাসেজ
    });
});

export default app; // 🔹 app কে export করা হচ্ছে server.ts এ ব্যবহারের জন্য
