import { z } from "zod";

export const createArticleSchema = z.object({
  title: z.string().trim().min(3).max(200),
  slug: z.string().trim().min(3).max(250),
  content: z.string().min(1),
  status: z.enum(["draft", "published"]).optional(),
});




export const updateArticleSchema = z
  .object({
    title: z.string().trim().min(3).max(200).optional(),
    slug: z.string().trim().min(3).max(250).optional(),
    content: z.string().min(1).optional(),
    status: z.enum(["draft", "published"]).optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "حداقل یک فیلد برای ویرایش ارسال کنید",
  });