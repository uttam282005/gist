import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";
import { getCookie } from 'hono/cookie'

export const authenticateUser = createMiddleware(async (c, next) => {
  try {
    const token: string | undefined = getCookie(c, 'jwtToken');
    if (!token) {
      return c.json({
        message: "User has not signed up",
        success: false
      })
    }
    try {
      const payload = await verify(token, c.env.jwtSecret);
      if (!payload) {
        return c.json({
          message: "User has not signed up",
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
  } catch (error) {
    return c.status(403);
  }
})
