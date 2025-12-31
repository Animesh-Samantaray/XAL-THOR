import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './utils/db.js';
import userRoute from './routes/user.route.js';
import companyRoute from './routes/company.route.js';
const app=express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true
}));

dotenv.config({});
const PORT=process.env.PORT || 3000;

app.use('/api/v1/user',userRoute);
app.use('/api/v1/company',companyRoute);

app.listen(PORT,()=>{
    connectDB();
    console.log(`Server started on port : ${PORT}`)
})