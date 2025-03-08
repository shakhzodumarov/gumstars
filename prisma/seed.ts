// seed.ts (CommonJS)
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.create({
    data: {
      name: 'Ismoyil bekov',
      email: 'gumstar@admin.com',
      emailVerified: new Date(),
      hashedPassword: 'hashedPassword123',
      image: 'https://example.com/avatar1.jpg',
      accounts: {
        create: [
          {
            type: 'oauth',
            provider: 'google',
            providerAccountId: 'google-alice',
            refresh_token: 'refreshToken1',
            access_token: 'accessToken1',
            expires_at: Math.floor(Date.now() / 1000) + 3600,
            token_type: 'Bearer',
            scope: 'read write',
            id_token: 'idToken1',
            session_state: 'sessionState1',
          },
        ],
      },
    },
  });
  
  console.log(`Created user: ${user1.name}`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
