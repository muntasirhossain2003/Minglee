import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.js';
dotenv.config();

const app = express();
const port= process.env.PORT||5000;


app.listen(port, () => {
 connectDB()
  console.log(`Server is running on http://localhost:${port}`);
});     