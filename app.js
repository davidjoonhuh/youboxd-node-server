import express from 'express';
import cors from 'cors';
import UserController from "./users/users-controller.js";
import AuthController from './users/auth-controller.js';
import VideosController from './videos/videos-controller.js';
import CommentsController from './comments/comments-controller.js';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";

const CONNECTION_STRING = 'mongodb+srv://wdev59842:supersecretpassword@cluster0.uh2oh9q.mongodb.net/youboxd?retryWrites=true&w=majority'
console.log(CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
      sameSite: "none",
      secure: true,
    };
  }
  app.use(session(sessionOptions));
  
app.use(express.json());
AuthController(app);
UserController(app);
CommentsController(app);
VideosController(app);
app.listen(process.env.PORT || 4000);