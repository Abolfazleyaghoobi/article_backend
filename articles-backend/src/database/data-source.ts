
import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env";
import { User } from "../modules/users/entities/user.entity";
import { Article } from "../modules/articles/entities/article.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

entities: [User, Article],
migrations: ["articles-backend/src/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
});
