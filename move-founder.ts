import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const founder = await prisma.user.findUnique({
    where: {
      email: "founder@pollacle.com",
    },
  });


  if (!founder) {
    throw new Error("Founder account missing");
  }


  await prisma.fundraiser.update({
    where: {
      slug: "help-launch-pollacle",
    },
    data: {
      userId: founder.id,
    },
  });


  console.log("Fundraiser moved to founder@pollacle.com");

}

main()
.catch(console.error)
.finally(() => prisma.$disconnect());
