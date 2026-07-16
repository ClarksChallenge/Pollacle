import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import { safeCompare, logServerError } from "@/app/lib/server-helpers";


export async function POST(req: Request) {

  try {


    const body = await req.json();


    const {
      sessionId,
      reward,
      secret,
      transactionId,
    } = body;



    // =====================================
    // VERIFY CPX CALLBACK SECRET
    // =====================================

    if (!safeCompare(secret, process.env.CPX_CALLBACK_SECRET)) {
      return NextResponse.json({ error: "Unauthorized CPX callback" }, { status: 401 });
    }





    // =====================================
    // VALIDATE SESSION ID
    // =====================================

    if (!sessionId) {

      return NextResponse.json(
        {
          error: "Missing sessionId",
        },
        {
          status: 400,
        }
      );

    }





    // =====================================
    // FIND SURVEY SESSION
    // =====================================

    const session =
      await prisma.surveySession.findUnique({

        where: {
          id: sessionId,
        },

        include: {
          fundraiser: true,
        },

      });





    if (!session) {

      return NextResponse.json(
        {
          error: "Survey session not found",
        },
        {
          status: 404,
        }
      );

    }





    // =====================================
    // PREVENT DOUBLE CREDIT
    // =====================================

    if (
      session.status === "COMPLETED"
    ) {

      return NextResponse.json({

        success: true,

        message: "Survey already credited",

      });

    }





    // =====================================
    // VALIDATE REWARD
    // =====================================

    const rewardAmount =
      Number(reward);



    if (
      !rewardAmount ||
      rewardAmount <= 0
    ) {

      return NextResponse.json(
        {
          error: "Invalid reward amount",
        },
        {
          status: 400,
        }
      );

    }





    // =====================================
    // MARK SESSION COMPLETE
    // =====================================

    await prisma.surveySession.update({

      where: {
        id: session.id,
      },

      data: {

        status: "COMPLETED",

        completedAt: new Date(),

      },

    });






    // =====================================
    // SAVE SURVEY COMPLETION
    // =====================================

    await prisma.surveyCompletion.create({

      data: {

        fundraiserId:
          session.fundraiserId,


        provider:
          "CPX Research",


        rewardAmount,


        transactionId:
          transactionId || null,


        status:
          "COMPLETED",


        completedAt:
          new Date(),

      },

    });







    // =====================================
    // CREDIT POLLACLE FUNDRAISER
    // =====================================

    await prisma.fundraiser.update({

      where: {

        id: session.fundraiserId,

      },

      data: {

        amountRaised: {

          increment: rewardAmount,

        },


        surveySupporters: {

          increment: 1,

        },

      },

    });







    return NextResponse.json({

      success: true,

      message:
        "Survey credited successfully",


      fundraiser:
        session.fundraiser.title,


      rewardAmount,


    });





  } catch(error) {


    logServerError("cpx-callback", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });



    return NextResponse.json(

      {
        error: "Server error",
      },

      {
        status: 500,
      }

    );

  }

}
