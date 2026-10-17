
import bcrypt from "bcrypt";
import { AppDataSource } from "../../database/data-source";
import { User } from "../users/entities/user.entity";
import type { RegisterDto, LoginDto } from "./auth.dto";
import { signAccessToken } from "./jwt.service";

const userRepository = AppDataSource.getRepository(User);

export async function registerUser(data: RegisterDto) {
  const name = data.name.trim();
  const email = data.email.trim().toLowerCase();

  const passwordBytes = Buffer.byteLength(data.password, "utf8");

  if (passwordBytes < 8 || passwordBytes > 72) {
    throw new Error("رمز عبور باید حداقل ۸ و حداکثر ۷۲ بایت باشد");
  }

  const existingUser = await userRepository.findOneBy({ email });

  if (existingUser) {
    throw new Error("این ایمیل قبلاً ثبت شده است");
  }

  const passwordHash = await bcrypt.hash(data.password, 12);

  const user = userRepository.create({
    name,
    email,
    passwordHash,
  });

  await userRepository.save(user);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
}

export async function loginUser(data: LoginDto) {
  const email = data.email.trim().toLowerCase();

  // passwordHash به دلیل select: false باید صریحاً انتخاب شود.
  const user = await userRepository
    .createQueryBuilder("user")
    .addSelect("user.passwordHash")
    .where("user.email = :email", { email })
    .getOne();

  if (!user) {
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error("ایمیل یا رمز عبور اشتباه است");
  }

  const accessToken = signAccessToken(user.id);

  return {
    accessToken,
    tokenType: "Bearer",
    expiresIn: 3600,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
    },
  };
}
