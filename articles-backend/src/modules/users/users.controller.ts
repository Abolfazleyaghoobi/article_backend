
import type { Request, Response } from "express";
import { AppDataSource } from "../../database/data-source";
import { User } from "./entities/user.entity";
import { createUserSchema ,updateUserSchema} from "./users.dto";
import { AppError } from "../../common/errors/app.error";

const userRepository = AppDataSource.getRepository(User);
export const getUsers = async (_req: Request, res: Response) => {
  const users = await userRepository.find();

  res.json({
    success: true,
    data: users,
  });
};


// create user
export const createUser = async (req: Request, res: Response) => {
  const result = createUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "اطلاعات ورودی معتبر نیست",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }



 const user = userRepository.create(result.data);

try {
  const savedUser = await userRepository.save(user);

  return res.status(201).json({
    success: true,
    data: savedUser,
  });
} catch (error) {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    error.code === "ER_DUP_ENTRY"
  ) {
    throw new AppError("این ایمیل قبلاً ثبت شده است", 409);
  }

  throw error;
}
};


// find user by id
export const getUserById = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "شناسه کاربر معتبر نیست",
    });
  }


  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "کاربر پیدا نشد",
    });
  }

  return res.json({
    success: true,
    data: user,
  });
};




// update user

export const updateUser = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "شناسه کاربر معتبر نیست",
    });
  }

  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "اطلاعات ورودی معتبر نیست",
      errors: result.error.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (Object.keys(result.data).length === 0) {
    return res.status(400).json({
      success: false,
      message: "حداقل یک فیلد برای ویرایش ارسال کن",
    });
  }


  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "کاربر پیدا نشد",
    });
  }

  userRepository.merge(user, result.data);
  const updatedUser = await userRepository.save(user);

  return res.json({
    success: true,
    data: updatedUser,
  });
};


// delete user

export const deleteUser = async (
  req: Request,
  res: Response,
) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.status(400).json({
      success: false,
      message: "شناسه کاربر معتبر نیست",
    });
  }

  const user = await userRepository.findOneBy({ id });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "کاربر پیدا نشد",
    });
  }

  await userRepository.remove(user);

  return res.status(200).json({
    message:"user deleted successfully"
  });
};
