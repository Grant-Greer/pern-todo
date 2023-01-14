import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Import the Prisma client instance
import { prisma } from "../app";

dotenv.config();

const authRouter: Router = Router();

const secret: string = process.env["JWT_SECRET"]!;

authRouter.post("/users", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Hash the password
  //const hashedPassword: string = await bcrypt.hash(password, 10);
  // Create a new user in the database
  const user = await prisma.user.create({
    data: { username, password },
  });
  // Generate a JSON web token (JWT)
  const token = jwt.sign({ id: user.id }, secret);
  // Return the JWT to the client
  res.json({ token });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  // Get the username and password from the request body
  const { username, password } = req.body;
  // Query the database for a user with the specified username
  const user = await prisma.user.findUnique({ where: { username } });
  // If no user was found, return an error
  if (!user) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  // Compare the provided password with the hashed password in the database
  const isValidPassword = await bcrypt.compare(password, user.password);
  // If the password is incorrect, return an error
  if (!isValidPassword) {
    return res.status(401).json({ error: "Invalid username or password" });
  }
  // Generate a JSON web token (JWT)
  const token = jwt.sign({ id: user.id }, secret);
  // Return the JWT to the client
  return res.json({ token });
});

authRouter.post("/logout", (req: Request, res: Response) => {
  // Clear the user's session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    return res.json({ message: "Successfully logged out" });
  });
});

export default authRouter;
