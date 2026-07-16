import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { logServerError } from "@/app/lib/server-helpers";


export async function POST(req: Request) {

  try {

    const body = await req.json();


    const {
      fundraiserSlug,
      transactionId,
      rewardAmount
    } = body;



    if (!fundraiserSlug) {

      return NextResponse.json(
        {
          error:"Missing fundraiser"
        },
        {
          status:400
        }
      );

    }




    const fundraiser =
      await prisma.fundraiser.findUnique({

        where:{
          slug: fundraiserSlug
        }

      });



    if (!fundraiser) {

      return NextResponse.json(
        {
          error:"Fundraiser not found"
        },
        {
          status:404
        }
      );

    }

    // Ensure fundraiser belongs to founder during single-founder launch
    const founderEmail = process.env.FOUNDER_EMAIL;
    if (!founderEmail) {
      return NextResponse.json({ error: "Platform not configured for public use" }, { status: 403 });
    }
    const founder = await prisma.user.findUnique({ where: { email: founderEmail } });
    if (!founder || fundraiser.userId !== founder.id) {
      return NextResponse.json({ error: "Fundraiser not available" }, { status: 403 });
    }




    const reward = Number(rewardAmount) || 1.5;

    if (isNaN(reward) || reward <= 0) {
      return NextResponse.json({ error: "Invalid reward amount" }, { status: 400 });
    }




    await prisma.surveyCompletion.create({

      data:{

        fundraiserId: fundraiser.id,

        provider:"CPX Research",

        transactionId,

        rewardAmount:reward,

        status:"COMPLETED"

      }

    });





    await prisma.fundraiser.update({

      where:{
        id: fundraiser.id
      },

      data:{

        amountRaised:{
          increment:reward
        },

        surveySupporters:{
          increment:1
        }

      }

    });





    return NextResponse.json({

      success:true,

      message:"Survey credit applied"

    });



  } catch (error) {
    logServerError("survey-complete", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }

}
