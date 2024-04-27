import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { newGroupChat } from "../controllers/chat.js";
const app = express.Router();

// protected routes here

app.use(isAuthenticated);

// group chat routes here
app.get("/new", newGroupChat);

export default app;
