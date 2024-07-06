"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBlogInputSchema = exports.createBlogInputSchema = exports.userSignUpInputSchema = exports.userSignInInputSchema = void 0;
const zod_1 = require("zod");
exports.userSignInInputSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email({ message: 'Invalid email' }),
    password: zod_1.z.string().min(6),
});
exports.userSignUpInputSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: 'Invalid email' }),
    password: zod_1.z.string().min(6),
});
exports.createBlogInputSchema = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
});
exports.updateBlogInputSchema = zod_1.z.object({
    updatedTitle: zod_1.z.string(),
    updatedContent: zod_1.z.string(),
    blogId: zod_1.z.string().uuid()
});
