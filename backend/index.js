import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import userRouter from './routes/user.routes.js';
dotenv.config();

const app = express();
const port= process.env.PORT||5000;

app.use(cors({
  origin: 'http://localhost:5173',
  withCredentials: true,
}))
app.use(express.json());
app.use(cookieParser());


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);



app.listen(port, () => {
 connectDB()
  console.log(`Server is running on http://localhost:${port}`);
});     