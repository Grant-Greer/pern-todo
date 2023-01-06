import express from "express";
import dotenv from "dotenv";
import router from "./routes/auth.route";
import morgan from "morgan";
import session from "express-session";
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
app.use(morgan("dev"));
app.use(verifyJwt);
app.use("/api", router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
