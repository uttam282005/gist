import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings, Variables } from "..";
import { setCookie } from "hono/cookie";
import {
  userSignInInputSchema,
  userSignUpInputSchema,
} from "@frumptious_clone/common";

const user = new Hono<{
  Bindings: Bindings;
  Variables: Variables;
}>();
user.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const { username, password, email } = await c.req.json();
    if (!username || !email || !password)
      return c.json({
        message: "Input fields are missing",
        success: false,
      });
    const { success } = userSignInInputSchema.safeParse({
      username,
      email,
      password,
    });
    if (!success)
      return c.json({
        message: "Invalid inputs (passowrd must contain atleast 6 characters and Email should be of valid format!)",
        success: false,
      });
    const emailAlreadyExist = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (emailAlreadyExist)
      return c.json({
        message: "Email already exist",
        success: false,
      });
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password,
      },
    });
    const token = await sign(
      {
        userId: user?.id,
        email,
      },
      c.env.jwtSecret
    );
    setCookie(c, 'jwtToken', token, {
      httpOnly: true,
      sameSite: "Lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    return c.json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    c.status(403);
  }
});

user.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { email, password } = await c.req.json();
    const { success } = userSignUpInputSchema.safeParse({
      email,
      password,
    });
    if (!success)
      return c.json({
        message: "Invalid inputs",
        success: false,
      });
    if (!(email && password)) {
      return c.json({
        message: "Missing credentials",
        success: false,
      });
    }
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return c.json({
        message: "Can't find user! please sign up",
        success: false,
      });
    }
    const is_password_correct: boolean = password == user?.password;
    if (!is_password_correct) {
      return c.json({
        message: "Password is incorrect",
        success: false,
      });
    }
    const payload = {
      userId: user?.id,
      email,
    };
    const token = await sign(payload, c.env.jwtSecret);
    setCookie(c, 'jwtToken', token, {
      httpOnly: true,
      sameSite: "Lax",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    return c.json({
      message: "User logged in successfully",
      success: true,
    });
  } catch (error) {
    console.error(error);
    c.status(403);
  }
});

user.get("/blog", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get("userId");
    const blogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });
    return c.json({
      blogs,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return c.status(403);
  }
});

export default user;
