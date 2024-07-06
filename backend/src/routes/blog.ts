import { PrismaClient } from "@prisma/client/edge";
import { Hono } from "hono";
import { Bindings, Variables } from "..";
import { withAccelerate } from "@prisma/extension-accelerate";
import { createBlogInputSchema, updateBlogInputSchema } from "@frumptious_clone/common";

const blog = new Hono<{
  Bindings: Bindings,
  Variables: Variables
}>()

blog.post('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { title, content } = await c.req.json();
    const { success } = createBlogInputSchema.safeParse({
      title,
      content
    });
    if (!success) return c.json({
      message: "invalid inputs",
      success: false
    });
    const authorId = c.get('userId');
    if (!title) return c.json({
      message: "title is missing",
      success: false
    });
    if (!content) return c.json({
      message: "content is missing",
      success: false
    });
    const blog = await prisma.user.update({
      where: {
        id: authorId,
      }, data: {
        post: {
          create: {
            title,
            content,
          }
        }
      }
    });
    return c.json({
      message: "blog posted",
      blog,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return c.json({
      message: "failed to post",
      success: false
    })
  }
})

blog.get('/:id', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogId: string | undefined = c.req.param('id');
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      },
    });
    if (!blog) return c.json({
      message: "Blog not found",
    });
    return c.json({
      blog,
      success: true
    });
  } catch (error) {
    console.error(error);
    return c.status(403);
  }
})

blog.get('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blogs = await prisma.post.findMany();
    const publishedBlogs = blogs.filter((blog) => blog.published);
    return c.json({
      publishedBlogs,
      success: true
    })

  } catch (error) {
    console.error(error);
    return c.json({
      message: "server error",
      success: false
    })

  }
})

blog.put('/', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { updatedContent, updatedTitle, blogId } = await c.req.json();
    const { success } = updateBlogInputSchema.safeParse({
      updatedTitle,
      updatedContent,
      blogId
    });
    if (!success) return c.json({
      message: "invalid inputs",
      success: false
    });
    const blog = await prisma.post.update({
      where: {
        id: blogId,
      }, data: {
        title: updatedTitle ? updatedTitle : undefined,
        content: updatedContent ? updatedContent : undefined
      }
    });
    return c.json({
      message: "updated",
      blog,
      success: true,
    })
  } catch (error) {
    console.error(error);
    return c.json({
      message: "failed to update",
      success: false,
    })
  }
})

export default blog
