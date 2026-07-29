import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const fundraiser = await prisma.fundraiser.findUnique({
    where: {
      slug: "help-launch-pollacle",
    },
  });

  console.log(fundraiser);

}

main()
.finally(() => prisma.$disconnect());
