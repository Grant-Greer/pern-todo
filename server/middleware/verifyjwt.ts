// middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret: string = process.env.JWT_SECRET!;

// Custom type for the JWT payload
interface JwtPayload {
  id: string;
  username: string;
}

function verifyJwt(req: Request, res: Response, next: NextFunction) {
  try {
    // Verify the JWT in the Authorization header
    const headers = req.headers;
    const authorizationHeader = headers["authorization"];
    const token = authorizationHeader!.split(" ")[1];
    const payload = jwt.verify(token, secret) as JwtPayload;

    // Check if the user's ID in the payload matches the ID in the request parameters
    const userId = payload.id;
    if (userId !== req.params.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the JWT is valid and the user is authorized, pass control to the next middleware function
    next();
  } catch (error) {
    // If the JWT is invalid or has expired, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default verifyJwt;
