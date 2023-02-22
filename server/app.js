import express from "express";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";


dotenv.config();

export const prisma = new PrismaClient();
const app = express();


app.use(express.json());

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
