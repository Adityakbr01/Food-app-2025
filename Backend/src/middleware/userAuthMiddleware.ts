
import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { _config } from "../utills/Config";
import sendErrorResponse from "../utills/sendErrorResponse";
const JWT_SECRET = _config.jwt_Secret as string || process.env.JWT_SECRET as string;

// ✅ Custom Interface to Extend Request
export interface AuthRequest extends Request {
  userId?: string;
  role?: string;
}

export const authenticateUser = (
  req: AuthRequest, 
  res: Response,
  next: NextFunction
): void => {
  // ✅ Return type explicitly void
  const token =
    req.header("Authorization")?.split(" ")[1] || // Header se
    req.cookies?.token || // Cookie se
    req.body?.token; // Body se

    console.log(token);
  if (!token) {
    sendErrorResponse(res, 401, "Access denied. No token provided");
    return; 
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as {
      userId: string;
      role: string;
    };
    req.userId = decoded.userId; // ✅ Assign userId
    req.role = decoded.role;

    next(); // ✅ Move to next middleware
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
    return; // ✅ Ensure function exits properly
  }
};
