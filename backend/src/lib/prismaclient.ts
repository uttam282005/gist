import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const createPrismaClient = (dburl: string) => {
  return new PrismaClient({ datasourceUrl: dburl }).$extends(withAccelerate());
};

export class Singleton {
  private static prismaInstance: ReturnType<typeof createPrismaClient> ;

  // Prevent direct instantiation
  private constructor() {}

  public static getInstance(dburl?: string): ReturnType<typeof createPrismaClient> {
    if (!Singleton.prismaInstance) {
      if (!dburl) {
        throw new Error("Database URL must be provided when initializing Singleton.");
      }

      const prisma = createPrismaClient(dburl);

      Singleton.prismaInstance = prisma;
    } 

    return Singleton.prismaInstance;
  }
}

