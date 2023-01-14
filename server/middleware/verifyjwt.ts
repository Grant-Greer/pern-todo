// middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret: string = process.env["JWT_SECRET"]!;

function verifyJwt(req: Request, res: Response, next: NextFunction) {
  try {
    // Check if the Authorization header is present and starts with "Bearer "
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the ID in the request parameters is a number
    if (!req.params["id"] || !req.params["id"].match(/^[0-9]+$/)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];
// Check if the token is a number
    if (!token || !token.match(/^[0-9]+$/)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Verify the JWT in the Authorization header
    const payload: string | JwtPayload = jwt.verify(token, secret);

    if (!payload) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Check if the user's ID in the payload matches the ID in the request parameters
    const userId = payload;
    if (userId !== req.params["id"]) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // If the JWT is valid and the user is authorized, pass control to the next middleware function
    return next();
  } catch (error) {
    // If the JWT is invalid or has expired, return an error
    return res.status(401).json({ error: "Unauthorized" });
  }
}

export default verifyJwt;
