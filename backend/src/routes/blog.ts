import { createBlogInputSchema, updateBlogInputSchema } from "@frumptious_clone/common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { Bindings, Variables } from "..";
import Groq from "groq-sdk";

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
      message: "Invalid inputs",
      success: false
    });
    const authorId = c.get('userId');
    if (!title) return c.json({
      message: "Title is missing",
      success: false
    });
    if (!content) return c.json({
      message: "Content is missing",
      success: false
    });
    const blog = await prisma.post.create({
      data: {
        title,
        content,
        authorId
      }
    });
    return c.json({
      message: "Blog posted",
      blog,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return c.status(403);
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
      }, select: {
        title: true,
        content: true,
        author: {
          select: {
            username: true,
            email: true,
            id: true
          }
        }
      }
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
    const blogs = await prisma.post.findMany({
      select: {
        createdAt: true,
        title: true,
        id: true,
        content: true,
        published: true,
        author: {
          select: {
            username: true,
            email: true,
            id: true,
          }
        }
      }
    });
    const publishedBlogs = blogs.filter((blog) => blog.published);
    return c.json({
      publishedBlogs,
      success: true
    })
  } catch (error) {
    console.error(error);
    return c.status(403);
  }
})

blog.put('/', async (c) => {
  try {
    const userId = c.get('userId');
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const { updatedContent, updatedTitle, blogId } = await c.req.json();
    const blogToUpdate = await prisma.post.findUnique({
      where: {
        id: blogId,
      }
    });
    if (userId !== blogToUpdate?.authorId)
      return c.json({
        message: "You are not authorised to edit this blog.",
        success: false
      })
    const { success } = updateBlogInputSchema.safeParse({
      updatedTitle,
      updatedContent,
      blogId
    });
    if (!success) return c.json({
      message: "Invalid inputs",
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
      message: "Blog updated",
      blog,
      success: true,
    })
  } catch (error) {
    console.error(error);
    return c.status(403);
  }
})
blog.get('/summarize/:id', async (c) => {
  try {
    const blogId = c.req.param('id');
    if (!blogId) {
      return c.json({
        message: "Blog content is missing",
        status: false
      })
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    const blog = await prisma.post.findUnique({
      where: {
        id: blogId,
      }
    });
    if (!blog) {
      return c.json({
        message: "Blog not found",
        status: false
      })
    }
    const groq = new Groq({ apiKey: c.env.GROQ_API_KEY })
    const completion = await groq.chat.completions
      .create({
        messages: [
          {
            role: "system",
            content: "You are a highly skilled AI trained in language comprehension and summarization. I would like you to read the following text and summarize it into a concise abstract paragraph. Aim to retain the most important points, providing a coherent and readable summary that could help a person understand the main points of the discussion without needing to read the entire text. Please avoid unnecessary details or tangential points and only respond with a summary"
          },
          {
            role: "user",
            content: blog?.content || "",
          },
        ],
        model: "llama3-70b-8192",
      })
    return c.json({
      summary: completion.choices[0].message.content,
      status: true,
    });
  }
  catch (error) {
    console.error(error);
    return c.status(403);
  }
})

blog.delete('/:id', async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const blogId = c.req.param('id');
    const userId = c.get('userId');

    const blogToDelete = await prisma.post.findUnique({
      where: { id: blogId },
    });

    if (userId !== blogToDelete?.authorId) {
      return c.json({
        message: "You are not authorized to delete this blog",
        success: false
      });
    }

    await prisma.post.delete({
      where: { id: blogId },
    });

    return c.json({
      message: "Blog deleted successfully",
      success: true
    });
  } catch (error) {
    console.error(error);
    return c.status(500);
  }
});

// blog.get('/vectorize/:id', async (c) => {
//   try {
//     const blogId = c.req.param('id');
//     const prisma = new PrismaClient({
//       datasourceUrl: c.env.DATABASE_URL,
//     }).$extends(withAccelerate());
//     const blog = await prisma.post.findUnique({
//       where: {
//         id: blogId,
//       }
//     });
//     if (!blog) {
//       return c.json({
//         message: "Blog not found",
//         status: false
//       })
//     }
//     const { data } = await c.env.AI.run("@cf/baai/bge-base-en-v1.5", {
//       text: [blog.content],
//     });
//     const values = data[0];
//     console.log(data);

//     if (!values) {
//       return c.json({
//         message: "Failed to generate vector embedding",
//         success: false
//       })
//     }
//     const inserted = await c.env.VECTOR_INDEX.upsert([{ id: blog.id, values }]);
//     if (!inserted) {
//       return c.json({
//         message: "Failed to insert vector embedding",
//         values,
//         success: false
//       })
//     }
//     return c.json({
//       message: "Vector embedding inserted",
//       success: true
//     })
//   }
//   catch (error) {
//     console.error(error);
//     return c.status(403);
//   }
// })
// blog.get('/chat/:id', async (c) => {
//   try {
//     const blogId = c.req.param('id');
//     const { message } = await c.req.json();
//     const embedding = await c.env.AI.run("@cf/baai/bge-base-en-v1.5", {
//       text: [message],
//     });
//     const values = embedding.data[0];
//     const results = await c.env.VECTOR_INDEX.query(values, {
//       topK: 1,
//       filter: `id = ${blogId}`,
//     });
//     return c.json({
//       results,
//       success: true
//     });
//   }
//   catch (error) {
//     console.error(error);
//     return c.status(403);
//   }
// })
export default blog
