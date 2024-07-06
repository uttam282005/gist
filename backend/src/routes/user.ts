import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { sign } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Bindings, Variables } from "..";
import { userSignInInputSchema, userSignUpInputSchema } from "@frumptious_clone/common";

const user = new Hono<{
  Bindings: Bindings,
  Variables: Variables
}>()
user.post('/signin', async (c) => {
  try {
    console.log(c.env.DATABASE_URL)
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }
    ).$extends(withAccelerate());

    const { username, password, email } = await c.req.json()
    if (!username || !email || !password) return c.json({
      message: "fields are missing",
      success: false
    });
    const { success } = userSignInInputSchema.safeParse({
      username,
      email,
      password
    });
    if (!success) return c.json({
      message: "Invalid inputs",
      success: false
    });
    const emailAlreadyExist = await prisma.user.findUnique({
      where: {
        email
      }
    })
    if (emailAlreadyExist) return c.json({
      message: "email already exist",
      success: false
    })
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password
      }
    });
    console.log(user)
    const token = await sign({
      userId: user?.id,
      email
    }, c.env.jwtSecret)
    return c.json({
      token,
      success: true
    })
  } catch (error) {
    console.error(error);
    c.status(403);
  }

})

user.post('/signup', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { email, password } = await c.req.json();

    const { success } = userSignUpInputSchema.safeParse({
      email,
      password
    });
    if (!success) return c.json({
      message: "Invalid inputs",
      success: false
    });
    if (!(email && password)) {
      return c.json({
        message: "missing credentials",
        success: false
      })
    }
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    console.log(user)
    if (!user) {
      return c.json({
        message: "login failed",
        success: false
      })
    }
    const is_password_correct: boolean = (password == user?.password);
    if (!is_password_correct) {
      return c.json({
        message: "password is incorrect",
        success: false,
      });
    }
    const payload = {
      userId: user?.id,
      email,
    };
    const token = await sign(payload, c.env.jwtSecret);
    return c.json({
      message: "user logged in successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    c.status(403)
  }
})

user.get('/blog', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const userId = c.get('userId');
    const blogs = await prisma.post.findMany({
      where: {
        authorId: userId,
      }
    });
    return c.json({
      blogs,
      success: true,
    })
  } catch (error) {
    console.error(error);
    return c.json({
      message: "error",
      success: false
    })
  }
})

export default user
