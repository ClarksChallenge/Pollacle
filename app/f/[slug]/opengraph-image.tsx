import { ImageResponse } from "next/og";
import { prisma } from "@/app/lib/prisma";

export const runtime = "edge";

export const alt = "Pollacle Fundraiser";

export const size = {
  width: 1200,
  height: 630,
};


export default async function Image({
  params,
}: {
  params: {
    slug: string;
  };
}) {


  const fundraiser = await prisma.fundraiser.findUnique({
    where: {
      slug: params.slug,
    },
  });



  if (!fundraiser) {

    return new ImageResponse(

      (
        <div
          style={{
            fontSize: 60,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Pollacle
        </div>
      )

    );

  }




  return new ImageResponse(

    (

      <div

        style={{

          width:"100%",

          height:"100%",

          background:"#faf5ff",

          display:"flex",

          flexDirection:"column",

          padding:"60px",

          fontFamily:"Arial",

        }}

      >


        <div

          style={{

            fontSize:48,

            fontWeight:700,

            color:"#7e22ce",

          }}

        >

          🐙 Pollacle

        </div>




        <div

          style={{

            marginTop:40,

            fontSize:52,

            fontWeight:700,

            color:"#111827",

          }}

        >

          {fundraiser.title}

        </div>





        <div

          style={{

            marginTop:30,

            fontSize:34,

            color:"#4b5563",

          }}

        >

          ${fundraiser.amountRaised.toFixed(2)}
          {" "}
          raised of
          {" "}
          ${fundraiser.goalAmount.toFixed(2)}

        </div>





        <div

          style={{

            marginTop:50,

            fontSize:32,

            color:"#7e22ce",

          }}

        >

          Complete surveys. Create impact. No donation required.

        </div>


      </div>


    ),

    {

      width:1200,

      height:630,

    }

  );

}
