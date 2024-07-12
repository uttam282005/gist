import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authenticateUser = createMiddleware(async (c, next) => {
  try {
    const authHeader: string | undefined = c.req.header('authorization') as string;
    if (!authHeader) {
      return c.json({
        message: "auth header is missing",
        success: false
      });
    }
    const token: string | undefined = authHeader.split(' ')[1];
    if (!token) {
      return c.json({
        message: "user not signed in",
        success: false
      });
    }
    const payload = await verify(token, c.env.jwtSecret);
    if (!payload) {
      return c.json({
        message: "user not signed in",
        success: false
      });
    }
    c.set('userId', payload.userId);
    return await next();
  } catch (error) {
    console.error(error);
    return c.status(403);
  }
})
