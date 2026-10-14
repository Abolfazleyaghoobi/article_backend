
import "reflect-metadata";
import { DataSource } from "typeorm";
import { env } from "../config/env";
import { User } from "../modules/users/entities/user.entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: env.DB_HOST,
  port: env.DB_PORT,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_DATABASE,

  entities: [User],
migrations: ["articles-backend/src/database/migrations/*.ts"],

  synchronize: false,
  logging: false,
});
