import { z } from "zod";

export const userSignInInputSchema = z.object({
  username: z.string(),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

export const userSignUpInputSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(6),
});

export const createBlogInputSchema = z.object({
  title: z.string(),
  content: z.string(),
});

export const updateBlogInputSchema = z.object({
  updatedTitle: z.string(),
  updatedContent: z.string(),
  blogId: z.string().uuid()
})

export type CreateBlogInput = z.infer<typeof createBlogInputSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogInputSchema>;
export type UserSignInInput = z.infer<typeof userSignInInputSchema>;
export type UserSignUpInput = z.infer<typeof userSignUpInputSchema>;

