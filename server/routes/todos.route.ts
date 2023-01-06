import { Router, Request, Response } from "express";
import dotenv from "dotenv";
import verifyJwt from "../middleware/verifyjwt";

// Import the Prisma client instance
import { prisma } from "../index";

dotenv.config();

const todosRouter: Router = Router();

const secret: string = process.env.JWT_SECRET!;

interface JwtPayload {
  id: string;
  username: string;
}

todosRouter.get(
  "/users/:id/todos",
  verifyJwt,
  async (req: Request, res: Response) => {
    try {
      // If the JWT is valid and the user is authorized, retrieve the todos from the database
      const todos = await prisma.todo.findMany({
        where: { userId: parseInt(req.params.id) },
      });
      res.json(todos);
    } catch (error) {
      // If the JWT is invalid or has expired, return an error
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
);

todosRouter.post(
  "/users/:id/todos",
  verifyJwt,
  async (req: Request, res: Response) => {
    try {
      // If the JWT is valid and the user is authorized, create a new todo in the database
      const { title } = req.body;
      const newTodo = await prisma.todo.create({
        data: { title, user: { connect: { id: parseInt(req.params.id) } } },
      });
      res.json(newTodo);
    } catch (error) {
      // If the JWT is invalid or has expired, return an error
      return res.status(401).json({ error: "Unauthorized" });
    }
  }
);

todosRouter.put(
  "/todos/:id",
  verifyJwt,
  async (req: Request, res: Response) => {
    try {
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
  }
);

todosRouter.delete(
  "/todos/:id",
  verifyJwt,
  async (req: Request, res: Response) => {
    try {
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
  }
);

export default todosRouter;
