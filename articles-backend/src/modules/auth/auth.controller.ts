
import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { registerSchema } from "./auth.validation";
import { registerUser } from "./auth.service";
import { loginSchema } from "./auth.validation";
import { loginUser } from "./auth.service";


// register controller
export async function register(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = registerSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "اطلاعات ورودی معتبر نیست",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const user = await registerUser(validation.data);

    return res.status(201).json({
      success: true,
      message: "ثبت‌نام با موفقیت انجام شد",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "این ایمیل قبلاً ثبت شده است"
    ) {
      return res.status(409).json({
        success: false,
        message: error.message,
      });
    }

    if (
      error instanceof Error &&
      error.message === "رمز عبور باید حداقل ۸ و حداکثر ۷۲ بایت باشد"
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    return next(error);
  }
}



// login user controller
export async function login(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const validation = loginSchema.safeParse(req.body);

    if (!validation.success) {
      return res.status(400).json({
        success: false,
        message: "اطلاعات ورودی معتبر نیست",
        errors: validation.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      });
    }

    const user = await loginUser(validation.data);

    return res.status(200).json({
      success: true,
      message: "ورود موفقیت‌آمیز بود",
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "ایمیل یا رمز عبور اشتباه است"
    ) {
      return res.status(401).json({
        success: false,
        message: "ایمیل یا رمز عبور اشتباه است",
      });
    }

    return next(error);
  }
}

