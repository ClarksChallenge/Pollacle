import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.upsert({
    where: {
      email: "founder@pollacle.com",
    },
    update: {},
    create: {
      name: "Pollacle Founder",
      email: "founder@pollacle.com",
    },
  });

  console.log(user);

}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
