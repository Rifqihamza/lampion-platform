// import "dotenv/config";
// import { PrismaMariaDb } from "@prisma/adapter-mariadb";
// import { PrismaClient } from "../../generated/prisma/client";

// const prismaClientSingleton = () => {
//     const adapter = new PrismaMariaDb({
//         host: process.env.DATABASE_HOST,
//         user: process.env.DATABASE_USER,
//         password: process.env.DATABASE_PASSWORD,
//         database: process.env.DATABASE_NAME,
//         connectionLimit: 5
//     });
//     return new PrismaClient({ adapter });
// };

// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

// const globalForPrisma = globalThis as unknown as {
//     prisma: PrismaClientSingleton | undefined;
// };

// export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

// if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export { prisma };