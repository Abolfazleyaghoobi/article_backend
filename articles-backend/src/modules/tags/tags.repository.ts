
import { AppDataSource } from "../../database/data-source";
import { Tag } from "./entities/tag.entity";

export const tagRepository = AppDataSource.getRepository(Tag);
