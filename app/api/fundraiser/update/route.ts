import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/app/lib/prisma";
import { authOptions } from "@/app/lib/auth";


export async function POST(request: Request) {


  const session = await getServerSession(authOptions);


  if (!session?.user?.email) {

    return NextResponse.json(
      {
        error: "Unauthorized",
      },
      {
        status: 401,
      }
    );

  }



  const user = await prisma.user.findUnique({

    where: {
      email: session.user.email,
    },

  });



  if (!user) {

    return NextResponse.json(
      {
        error: "User not found",
      },
      {
        status: 401,
      }
    );

  }





  const formData = await request.formData();



  const id = formData.get("id") as string;



  const fundraiser = await prisma.fundraiser.findFirst({

    where: {

      id,

      userId: user.id,

    },

  });





  if (!fundraiser) {

    return NextResponse.json(

      {
        error: "You do not own this fundraiser",
      },

      {
        status: 403,
      }

    );

  }





  await prisma.fundraiser.update({

    where: {

      id,

    },

    data: {

      title: formData.get("title") as string,

      story: formData.get("story") as string,

      category: formData.get("category") as string,

      goalAmount: Number(
        formData.get("goalAmount")
      ),

    },

  });





  return NextResponse.redirect(

    new URL("/dashboard", request.url)

  );


}
