import { z } from "zod";
export declare const userSignInInputSchema: z.ZodObject<{
    username: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    email: string;
    password: string;
}, {
    username: string;
    email: string;
    password: string;
}>;
export declare const userSignUpInputSchema: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    password: string;
}, {
    email: string;
    password: string;
}>;
export declare const createBlogInputSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
}, {
    title: string;
    content: string;
}>;
export declare const updateBlogInputSchema: z.ZodObject<{
    updatedTitle: z.ZodString;
    updatedContent: z.ZodString;
    blogId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    updatedTitle: string;
    updatedContent: string;
    blogId: string;
}, {
    updatedTitle: string;
    updatedContent: string;
    blogId: string;
}>;
export type CreateBlogInput = z.infer<typeof createBlogInputSchema>;
export type UpdateBlogInput = z.infer<typeof updateBlogInputSchema>;
export type UserSignInInput = z.infer<typeof userSignInInputSchema>;
export type UserSignUpInput = z.infer<typeof userSignUpInputSchema>;
