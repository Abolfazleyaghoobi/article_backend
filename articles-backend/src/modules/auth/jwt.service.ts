
import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export interface JwtPayload {
  userId: number;
}

export function signAccessToken(userId: number): string {
  return jwt.sign(
    { userId },
    env.JWT_SECRET,
    {
      subject: String(userId),
      expiresIn: "1h",
    },
  );
}

export function verifyAccessToken(token: string): JwtPayload {
  const payload = jwt.verify(token, env.JWT_SECRET);

  if (
    typeof payload === "string" ||
    typeof payload.userId !== "number"
  ) {
    throw new Error("توکن نامعتبر است");
  }

  return {
    userId: payload.userId,
  };
}
