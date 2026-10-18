
import { Router } from "express";
import { createUser, deleteUser, getUsers, updateUser } from "../modules/users/users.controller";
import { getUserById } from "../modules/users/users.controller";
// auth routes
import authRouter from "../modules/auth/auth.routes";
// articles import
import articlesRouter from "../modules/articles/articles.routes";
// media import
import { mediaRouter } from "../modules/media/media.routes";


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

apiRouter.delete("/users/:id", deleteUser);

// articles routes

apiRouter.use("/articles", articlesRouter);


// auth routes
apiRouter.use("/auth", authRouter);


// media routes
apiRouter.use("/media", mediaRouter);