import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { logServerError } from "@/app/lib/server-helpers";
import { authOptions } from "@/app/lib/auth";


export async function POST(request: Request) {

  try {


    // SINGLE FOUNDER LAUNCH LOCK
    // Disable public fundraiser creation until platform launch

    return NextResponse.json(
      {
        error:
          "Fundraiser creation is currently disabled during Pollacle launch testing.",
      },
      {
        status: 403,
      }
    );



    /*
    ORIGINAL CREATION CODE SAVED BELOW FOR FUTURE ACTIVATION
    logServerError("fundraiser-create", error);

    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json(
        {
          error: "Please sign in first.",
        },
        {
          status: 401,
        }
      );
    }



    const user = await prisma.user.findUnique({
      where:{
        email: session.user.email,
      },
    });



    if (!user) {
      return NextResponse.json(
        {
          error:"User not found.",
        },
        {
          status:404,
        }
      );
    }



    const body = await request.json();



    const {
      title,
      story,
      goalAmount,
      category,
    } = body;



    if (
      !title ||
      !story ||
      !goalAmount ||
      !category
    ) {

      return NextResponse.json(
        {
          error:"Please complete all fields.",
        },
        {
          status:400,
        }
      );

    }



    function createSlug(title:string){

      return title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g,"")
        .replace(/\s+/g,"-")
        .replace(/-+/g,"-");

    }



    let slug=createSlug(title);



    let counter=1;



    while(
      await prisma.fundraiser.findUnique({
        where:{
          slug,
        },
      })
    ){

      slug=`${createSlug(title)}-${counter}`;

      counter++;

    }



    const fundraiser =
      await prisma.fundraiser.create({

        data:{

          userId:user.id,

          slug,
          title,
          story,
          category,

          goalAmount:Number(goalAmount),

          amountRaised:0,
          surveySupporters:0,
          cashDonations:0,

          status:"ACTIVE",

        },

      });



    return NextResponse.json({

      success:true,

      slug:fundraiser.slug,

    });


    */


  } catch (error) {
    logServerError("fundraiser-create", error);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }

}
