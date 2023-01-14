import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/auth.route";
import todosRouter from "./routes/todos.route";
import morgan from "morgan";
import session from "express-session";
import bodyParser from "body-parser";
import multer from "multer";

import verifyJwt from "./middleware/verifyjwt";
import { PrismaClient } from "@prisma/client";

dotenv.config();

export const prisma = new PrismaClient();

const app = express();

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(verifyJwt);
app.use("/api", authRouter);
app.use("/api", todosRouter);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
