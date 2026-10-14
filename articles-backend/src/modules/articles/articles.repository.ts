import { AppDataSource } from "../../database/data-source";
import { Article } from "./entities/article.entity";

export const articleRepository = AppDataSource.getRepository(Article);