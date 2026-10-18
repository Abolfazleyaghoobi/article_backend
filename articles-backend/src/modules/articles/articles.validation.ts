
import { z } from "zod";

const paragraphBlockSchema = z.object({
  type: z.literal("paragraph"),
  text: z.string().trim().min(1).max(20000),
});

const headingBlockSchema = z.object({
  type: z.literal("heading"),
  level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
  text: z.string().trim().min(1).max(300),
});

const listBlockSchema = z.object({
  type: z.literal("list"),
  style: z.enum(["ordered", "unordered"]),
  items: z.array(z.string().trim().min(1).max(2000)).min(1).max(100),
});

const codeBlockSchema = z.object({
  type: z.literal("code"),
  language: z.string().trim().min(1).max(50),
  code: z.string().min(1).max(50000),
});


const imageBlockSchema = z.object({
  type: z.literal("image"),
  url: z
    .string()
    .trim()
    .min(1)
    .max(1000)
    .refine(
      (value) =>
        /^\/uploads\/[a-zA-Z0-9_-]+\.(jpg|jpeg|png|webp|gif)$/i.test(
          value,
        ),
      "آدرس تصویر باید مسیر معتبر یک تصویر آپلودشده باشد",
    ),
  alt: z.string().trim().min(1).max(300),
  caption: z.string().trim().max(500).optional(),
});


const linkBlockSchema = z.object({
  type: z.literal("link"),
  text: z.string().trim().min(1).max(300),
  url: z
    .string()
    .url()
    .refine((value) => {
      try {
        const parsedUrl = new URL(value);
        return ["http:", "https:"].includes(parsedUrl.protocol);
      } catch {
        return false;
      }
    }, "آدرس لینک باید با HTTP یا HTTPS باشد"),
});

export const articleContentSchema = z
  .array(
    z.discriminatedUnion("type", [
      paragraphBlockSchema,
      headingBlockSchema,
      listBlockSchema,
      codeBlockSchema,
      imageBlockSchema,
      linkBlockSchema,
    ]),
  )
  .min(1)
  .max(500);

export const createArticleSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().min(3).max(250),
  content: articleContentSchema,
  status: z.enum(["draft", "published"]).optional(),
});

export const updateArticleSchema = z
  .object({
    title: z.string().trim().min(3).max(200).optional(),
    slug: z.string().trim().min(3).max(250).optional(),
    content: articleContentSchema.optional(),
    status: z.enum(["draft", "published"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "حداقل یک فیلد برای ویرایش ارسال کنید",
  });
