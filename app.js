import express from "express";
import { connectDB } from "./utils/features.js";
import dotenv from "dotenv";
import { errorMiddleware } from "./middlewares/error.js";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "http";
import { v4 as uuid } from "uuid";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

// import routes
import userRoutes from "./routes/user.js";
import chatRoutes from "./routes/chat.js";
import { createUser } from "./seeders/user.js";

const app = express();

// Load env variables
dotenv.config({
  path: "./.env",
});

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 5000;

// connect to database
connectDB(mongoURI);

// cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// createUser(10);

// Using Middlewares Here
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// load routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoutes);

// home route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API is running...🚀🚀",
  });
});

// Error Middleware
app.use(errorMiddleware);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
