import express, { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router: Router = Router();

router.post("/users", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create a new user in the database
  const user = await prisma.user.create({ data: { username, password } });
  // Generate a JSON web token (JWT)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  // Return the JWT to the client
  res.json({ token });
});

router.post("/login", async (req, res) => {
  // Get the username and password from the request body
  const { username, password } = req.body;
  // Query the database for a user with the specified username
  const user = await prisma.user.findOne({ where: { username } });
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
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
  // Return the JWT to the client
  res.json({ token });
});

router.post("/logout", (req, res) => {
  // Clear the user's session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to log out" });
    }
    res.json({ message: "Successfully logged out" });
  });
});

router.get("/users/:id/todos", async (req, res) => {
  try {
    // Verify the JWT in the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's ID in the payload matches the ID in the request parameters
    const userId = payload.id;
    if (userId !== req.params.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the JWT is valid and the user is authorized, retrieve the todos from the database
    const todos = await prisma.todo.findMany({
      where: { userId: parseInt(id) },
    });
    res.json(todos);
  } catch (error) {
    // If the JWT is invalid or has expired, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.post("/users/:id/todos", async (req, res) => {
  try {
    // Verify the JWT in the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's ID in the payload matches the ID in the request parameters
    const userId = payload.id;
    if (userId !== req.params.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the JWT is valid and the user is authorized, create a new todo in the database
    const { title } = req.body;
    const newTodo = await prisma.todo.create({
      data: { title, user: { connect: { id: parseInt(id) } } },
    });
    res.json(newTodo);
  } catch (error) {
    // If the JWT is invalid or has expired, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.put("/todos/:id", async (req, res) => {
  try {
    // Verify the JWT in the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the user's ID in the payload matches the ID in the request parameters
    const userId = payload.id;
    if (userId !== req.params.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the JWT is valid and the user is authorized, update the todo in the database
    const { id } = req.params;
    const { title, completed } = req.body;
    const updatedTodo = await prisma.todo.update({
      where: { id: parseInt(id) },
      data: { title, completed },
    });
    res.json(updatedTodo);
  } catch (error) {
    // If the JWT is invalid or has expired, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.delete("/todos/:id", async (req, res) => {
  try {
    // Verify the JWT in the Authorization header
    const token = req.headers.authorization.split(" ")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    // Check if the user's ID in the payload matches the ID in the request parameters
    const userId = payload.id;
    if (userId !== req.params.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // If the JWT is valid and the user is authorized, delete the todo from the database
    const { id } = req.params;
    const deletedTodo = await prisma.todo.delete({
      where: { id: parseInt(id) },
    });
    res.json(deletedTodo);
  } catch (error) {
    // If the JWT is invalid or has expired, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }
});

router.listen(3000, () => {
  console.log("Server is running on port 3000");
});
