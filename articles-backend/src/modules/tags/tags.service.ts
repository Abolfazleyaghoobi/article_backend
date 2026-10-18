
import { AppError } from "../../common/errors/app.error";
import { tagRepository } from "./tags.repository";

const createSlug = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\p{L}\p{N}-]/gu, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
};

export const createTag = async (name: string) => {
  const normalizedName = name.trim();
  const slug = createSlug(normalizedName);

  if (!slug) {
    throw new AppError("نام تگ معتبر نیست", 400);
  }

  const existingTag = await tagRepository.findOne({
    where: [{ name: normalizedName }, { slug }],
  });

  if (existingTag) {
    throw new AppError("این تگ قبلاً ثبت شده است", 409);
  }

  const tag = tagRepository.create({
    name: normalizedName,
    slug,
  });

  return tagRepository.save(tag);
};

export const getAllTags = async () => {
  return tagRepository.find({
    order: {
      name: "ASC",
    },
  });
};

export const getTagById = async (id: number) => {
  const tag = await tagRepository.findOneBy({ id });

  if (!tag) {
    throw new AppError("تگ موردنظر پیدا نشد", 404);
  }

  return tag;
};







export const updateTag = async (
  id: number,
  name: string,
) => {
  const normalizedName = name.trim();
  const slug = createSlug(normalizedName);

  if (!slug) {
    throw new AppError("نام تگ معتبر نیست", 400);
  }

  const tag = await getTagById(id);

  const existingTag = await tagRepository.findOne({
    where: [{ name: normalizedName }, { slug }],
  });

  if (existingTag && existingTag.id !== id) {
    throw new AppError("این نام یا آدرس تگ قبلاً ثبت شده است", 409);
  }

  tag.name = normalizedName;
  tag.slug = slug;

  return tagRepository.save(tag);
};





export const deleteTag = async (id: number) => {
  const tag = await getTagById(id);

  await tagRepository.remove(tag);

  return tag;
};
