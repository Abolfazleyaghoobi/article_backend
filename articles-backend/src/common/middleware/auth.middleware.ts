
import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../../modules/auth/jwt.service";

export function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "برای دسترسی به این منبع باید وارد شوید",
    });
  }

  const token = authorization.slice("Bearer ".length).trim();

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "توکن احراز هویت ارسال نشده است",
    });
  }

  try {
    const payload = verifyAccessToken(token);
    res.locals.userId = payload.userId;

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "توکن نامعتبر یا منقضی شده است",
    });
  }
}
