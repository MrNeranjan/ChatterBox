
import { PrismaClient } from "@prisma/client";


// Create a new prisma instance if it doesn't exist.this is the singleton pattern to avoid multiple instances of prisma
const prisma = globalThis.prisma || new PrismaClient();   
if (process.env.NODE_ENV ==! "production")globalThis.prisma = prisma;  //same client instance is used in development mode

export default prisma;