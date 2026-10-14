
import { Router } from "express";
import { createUser, getUsers, updateUser } from "../modules/users/users.controller";
import { getUserById } from "../modules/users/users.controller";

export const apiRouter = Router();

apiRouter.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Articles API is running 🚀",
  });
});

apiRouter.get("/users", getUsers);
apiRouter.post("/users", createUser);
apiRouter.get("/users/:id", getUserById);
apiRouter.patch("/users/:id", updateUser);
