import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./config/db.js"
import { errorHandler } from "./middlewares/error.js";
import videoRoutes from "./routes/video.js";
import signUploadRoutes from "./routes/sign-upload.js"

dotenv.config

express

const app = express();
const port=process.env.PORT||4000;

app.use(cors());
app.use(express.json());

app.use("/api/videos", videoRoutes);
app.use("/api/sign-upload", signUploadRoutes);

app.use(errorHandler);

app.listen(port, ()=>{
    connectDB();
    console.log("Server started listening on port", port);
});