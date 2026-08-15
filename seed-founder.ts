import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const email = process.env.FOUNDER_EMAIL || "founder@example.com";

  const user = await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      name: "Robert",
      email,
    },
  });


  const fundraiser = await prisma.fundraiser.upsert({
    where: {
      slug: "help-launch-pollacle",
    },

    update: {
      userId: user.id,
    },

    create: {

      userId: user.id,

      slug: "help-launch-pollacle",

      title: "Help Launch Pollacle",

      story:
        "Pollacle is changing the way communities raise support. Instead of asking people for donations, supporters complete surveys and turn their time into real impact. Every completed survey helps power the Pollacle mission.",

      category: "Community",

      goalAmount: 300000,

      amountRaised: 0,

      surveySupporters: 0,

      cashDonations: 0,

      views: 0,

      status: "ACTIVE",

    },
  });


  console.log("USER:");
  console.log(user);

  console.log("FUNDRAISER:");
  console.log(fundraiser);

}


main()
.catch(console.error)
.finally(() => prisma.$disconnect());
