import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {

  const user = await prisma.user.create({
    data: {
      name: "Robert",
      email: "founder@pollacle.com",
    },
  });


  const fundraiser = await prisma.fundraiser.create({

    data: {

      userId: user.id,

      slug: "help-launch-pollacle",

      title: "Help Launch Pollacle",

      story:
        "Pollacle is changing the way communities raise support. Instead of asking people to donate money, supporters can complete surveys and turn their time into real impact. Every completed survey helps power the Pollacle mission and support our launch.",

      category: "Community",

      goalAmount: 300000,

      amountRaised: 0,

      surveySupporters: 0,

      cashDonations: 0,

      views: 0,

      status: "ACTIVE",

    },

  });


  console.log("Founder created:");
  console.log(user);
  console.log(fundraiser);

}


main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
