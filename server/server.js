import express from "express";
import fileUpload from 'express-fileupload';
import dotenv from "dotenv";
import {connectDB} from "./config/db.js"
import { errorHandler } from "./middlewares/error.js";
import cloudinary from './config/cloudinary.js'
import uploadRoutes from "./routes/upload.js";
import signUploadRoutes from "./routes/sign-upload.js"

dotenv.config({path:'./config/.env'})



const app = express();
const port=process.env.PORT||4000;


app.use(fileUpload());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use('/api/sign-upload', signUploadRoutes)
app.use('/api/upload', uploadRoutes)

app.use(errorHandler);



app.listen(port, ()=>{
    connectDB();
    console.log("Server started listening on port", port);
});