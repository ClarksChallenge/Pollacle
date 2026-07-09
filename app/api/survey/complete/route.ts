import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";


export async function POST(request: Request) {

  try {

    const body = await request.json();


    const {
      slug,
      reward
    } = body;



    if (!slug) {

      return NextResponse.json(
        {
          error: "Missing fundraiser slug"
        },
        {
          status: 400
        }
      );

    }



    const fundraiser = await prisma.fundraiser.findUnique({

      where: {
        slug
      }

    });



    if (!fundraiser) {

      return NextResponse.json(
        {
          error: "Fundraiser not found"
        },
        {
          status: 404
        }
      );

    }



    const rewardAmount = reward || 1.50;



    const updatedFundraiser =
      await prisma.fundraiser.update({

        where: {
          slug
        },


        data: {

          amountRaised: {

            increment: rewardAmount

          },


          surveySupporters: {

            increment: 1

          },


          surveyCompletions: {

            create: {

              provider: "Pollacle Test Survey",

              rewardAmount

            }

          }

        }

      });





    return NextResponse.json({

      success: true,

      fundraiser: updatedFundraiser

    });



  } catch (error) {

    console.error(error);


    return NextResponse.json(

      {
        error: "Server error"
      },

      {
        status: 500
      }

    );

  }

}
