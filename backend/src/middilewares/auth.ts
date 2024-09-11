import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export const authenticateUser = createMiddleware(async (c, next) => {
  try {
    const authHeader: string | undefined = c.req.header('authorization');
    if (!authHeader) {
      return c.json({
        message: "User has not signed up",
        success: false
      });
    }
    const token: string | undefined = authHeader.split(' ')[1];
    if (!token) {
      return c.json({
        message: "User has not signed in",
        success: false
      })
    };
    try {
      const payload = await verify(token, c.env.jwtSecret);
      if (!payload) {
        return c.json({
          message: "User has not signed in",
          success: false
        });
      }
      c.set('userId', payload.userId);
      await next();
    } catch (error) {
      console.error(error);
      return c.json({
        message: "User has not signed up",
        success: false
      })
    }
   await next()
  } catch (error) {
    return c.status(403);
  }
})
