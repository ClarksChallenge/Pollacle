import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


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




    const reward =
      Number(rewardAmount) || 1.50;




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



  } catch(error){


    console.log(error);


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
