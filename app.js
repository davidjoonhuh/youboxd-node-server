import express from 'express';
import cors from 'cors';
import UserController from "./users/users-controller.js";
import AuthController from './users/auth-controller.js';
import VideosController from './videos/videos-controller.js';
import CommentsController from './comments/comments-controller.js';
import session from "express-session";
import "dotenv/config";
import mongoose from "mongoose";



mongoose.connect("mongodb+srv://wdev59842:supersecretpassword@cluster0.uh2oh9q.mongodb.net/youboxd?retryWrites=true&w=majority")
const app = express();


app.use((req, res, next) => {
  const allowedOrigins = ["http://localhost:3000"];
  const incomingOrigin = req.headers.origin;

  if (allowedOrigins.includes(incomingOrigin)) {
    res.header("Access-Control-Allow-Origin", incomingOrigin);
  }

  res.header("Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods",
      "GET, PUT, POST, DELETE, PATCH, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");

  next();
});

app.use(express.json());
app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
);
app.use(express.json());
AuthController(app);
UserController(app);
CommentsController(app);
VideosController(app);
app.listen(process.env.PORT || 4000);

// const CONNECTION_STRING = 'mongodb+srv://wdev59842:supersecretpassword@cluster0.uh2oh9q.mongodb.net/youboxd?retryWrites=true&w=majority'
// console.log(CONNECTION_STRING)
// mongoose.connect(CONNECTION_STRING);


// const app = express();
// app.use(
//     cors({
//         credentials: true,
//         origin: process.env.FRONTEND_URL
//     })
// );
// const sessionOptions = {
//     secret: "any string",
//     resave: false,
//     saveUninitialized: false,
// };
// if (process.env.NODE_ENV !== "development") {
//     sessionOptions.proxy = true;
//     sessionOptions.cookie = {
//       sameSite: "none",
//       secure: true,
//     };
//   }
//   app.use(session(sessionOptions));
  
// app.use(express.json());
// AuthController(app);
// UserController(app);
// CommentsController(app);
// VideosController(app);
// app.listen(process.env.PORT || 4000);
