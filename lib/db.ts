import { PrismaClient } from '@prisma/client';

// Check if prisma is already declared globally (TypeScript doesn't complain)
declare var globalThis: {
  prisma?: PrismaClient;
};

export const db = globalThis.prisma || new PrismaClient();
if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = db;
}

