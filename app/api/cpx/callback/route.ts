import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function POST(req: Request) {

  try {

    const body = await req.json();

    const {
      sessionId,
      reward,
      secret
    } = body;


    // Verify CPX callback secret
    if (secret !== process.env.CPX_CALLBACK_SECRET) {

      return NextResponse.json(
        {
          error: "Unauthorized"
        },
        {
          status: 401
        }
      );

    }



    if (!sessionId) {

      return NextResponse.json(
        {
          error: "Missing sessionId"
        },
        {
          status:400
        }
      );

    }



    const session = await prisma.surveySession.findUnique({

      where:{
        id: sessionId
      },

      include:{
        fundraiser:true
      }

    });



    if (!session) {

      return NextResponse.json(
        {
          error:"Survey session not found"
        },
        {
          status:404
        }
      );

    }



    // Stop duplicate payouts
    if (session.status === "COMPLETED") {

      return NextResponse.json({

        success:true,

        message:"Survey already completed"

      });

    }



    const rewardAmount = Number(reward) || 0;



    // Update session
    await prisma.surveySession.update({

      where:{
        id:session.id
      },

      data:{

        status:"COMPLETED",

        completedAt:new Date()

      }

    });





    // Record completion
    await prisma.surveyCompletion.create({

      data:{

        fundraiserId:session.fundraiserId,

        provider:"CPX Research",

        rewardAmount,

        status:"COMPLETED",

        completedAt:new Date()

      }

    });





    // Credit fundraiser
    await prisma.fundraiser.update({

      where:{
        id:session.fundraiserId
      },

      data:{

        amountRaised:{
          increment:rewardAmount
        },

        surveySupporters:{
          increment:1
        }

      }

    });





    return NextResponse.json({

      success:true,

      message:"Survey credited successfully",

      fundraiser:session.fundraiser.title,

      rewardAmount

    });



  } catch(error) {


    console.error(error);


    return NextResponse.json(

      {
        error:"Server error"
      },

      {
        status:500
      }

    );

  }

}