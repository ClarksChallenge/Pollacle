import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const fundraisers = await prisma.fundraiser.findMany();

  console.log(fundraisers);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
