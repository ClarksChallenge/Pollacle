import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";
import crypto from "crypto";
import { logServerError } from "@/app/lib/server-helpers";


export async function GET(req: Request) {
  return handleCPX(req);
}


export async function POST(req: Request) {
  return handleCPX(req);
}



async function handleCPX(req: Request) {

  try {

    const url = new URL(req.url);


    const status = url.searchParams.get("status");
    const transactionId = url.searchParams.get("trans_id");
    const sessionId = url.searchParams.get("user_id");
    const reward = url.searchParams.get("amount_usd");
    const hash = url.searchParams.get("hash");



    if (!transactionId || !sessionId) {

      return NextResponse.json(
        {
          error: "Missing transaction ID or session ID"
        },
        {
          status:400
        }
      );

    }



    const secret = process.env.CPX_CALLBACK_SECRET;


    if (!secret) {

      return NextResponse.json(
        {
          error:"Missing CPX callback secret"
        },
        {
          status:500
        }
      );

    }



    // Verify CPX hash
    const expectedHash = crypto
      .createHash("md5")
      .update(`${transactionId}-${secret}`)
      .digest("hex");



    if (hash && hash !== expectedHash) {

      return NextResponse.json(
        {
          error:"Invalid CPX hash"
        },
        {
          status:401
        }
      );

    }




    const session = await prisma.surveySession.findUnique({

      where:{
        id:sessionId
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



    // Handle cancelled surveys

    if(status === "2") {

      await prisma.surveySession.update({

        where:{
          id:session.id
        },

        data:{
          status:"CANCELLED"
        }

      });


      return NextResponse.json({

        success:true,

        message:"Survey cancelled"

      });

    }





    const rewardAmount = Number(reward);



    if(!Number.isFinite(rewardAmount) || rewardAmount <= 0){

      return NextResponse.json(
        {
          error:"Invalid reward"
        },
        {
          status:400
        }
      );

    }




    const credited = await prisma.$transaction(async(tx)=>{


      const claimed = await tx.surveySession.updateMany({

        where:{
          id:session.id,
          status:"STARTED"
        },

        data:{

          status:"COMPLETED",

          completedAt:new Date()

        }

      });



      if(claimed.count === 0){

        return false;

      }





      await tx.surveyCompletion.create({

        data:{

          fundraiserId:session.fundraiserId,

          provider:"CPX Research",

          transactionId,

          rewardAmount,

          status:"COMPLETED",

          completedAt:new Date()

        }

      });






      await tx.fundraiser.update({

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



      return true;


    });





    return NextResponse.json({

      success:true,

      message: credited
        ? "Survey credited"
        : "Already credited",

      rewardAmount

    });



  } catch(error){

    logServerError("cpx-callback", error);


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
