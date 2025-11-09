import { Request, Response, NextFunction } from "express";
import { ApiErrorType } from "@/types/error-type";

/**
 * Centralized error handler for all routes.
 * Designed for enterprise-level Node.js + TypeScript projects.
 */
export const errorHandler = (
  err: ApiErrorType,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error values
  let statusCode = 500;
  let message = "Internal server error";

  // Operational errors (custom ApiErrorType)
  if (err && typeof err === "object" && "statusCode" in err && "message" in err) {
    const typedErr = err as ApiErrorType;
    statusCode = typedErr.statusCode ?? 500;
    message = typedErr.message ?? "Internal server error";
  }

  // Log errors for audit (use logging library in production)
  console.error(`[ERROR] ${req.method} ${req.originalUrl}`);
  console.error(err);

  // Immutable response object
  const response = Object.freeze({
    success: false,
    status: statusCode,
    message,
    stack: process.env.NODE_ENV === "development" ? (err as any)?.stack : undefined,
  });

  return res.status(statusCode).json(response);
};
