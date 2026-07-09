import { prisma } from "@/app/lib/prisma";


// GET FEATURED ACTIVE FUNDRAISERS

export async function GET() {

  try {

    const fundraisers = await prisma.fundraiser.findMany({

      where: {
        status: "ACTIVE",
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 6,

    });


    return Response.json(fundraisers);


  } catch (error: any) {

    console.error(error);


    return Response.json(

      {
        error: "Failed to fetch fundraisers",
        details: error?.message,
      },

      {
        status: 500,
      }

    );

  }

}
