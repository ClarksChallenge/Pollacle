import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export default async function AdminPage() {

  const session = await getServerSession(authOptions);


  if (!session?.user?.email) {
    redirect("/login");
  }


  if (
    session.user.email !== process.env.FOUNDER_EMAIL
  ) {

    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">

          <h1 className="text-3xl font-bold text-red-600">
            Access Denied
          </h1>

          <p className="mt-4 text-gray-600">
            This area is restricted to Pollacle founders.
          </p>

        </div>

      </main>
    );

  }



  const fundraiser =
    await prisma.fundraiser.findFirst({

      orderBy:{
        createdAt:"asc"
      }

    });



  return (

    <main className="min-h-screen bg-gray-100 p-8">


      <div className="max-w-6xl mx-auto">


        <h1 className="text-5xl font-bold text-purple-700">
          🐙 Pollacle Founder Admin
        </h1>


        <p className="mt-3 text-gray-600">
          Single-founder launch control panel
        </p>




        {fundraiser && (

          <div className="mt-10 bg-white rounded-3xl shadow-xl p-8">


            <h2 className="text-3xl font-bold">
              Launch Fundraiser
            </h2>


            <div className="mt-6 space-y-4">


              <div>
                <strong>Title:</strong>
                <p>{fundraiser.title}</p>
              </div>


              <div>
                <strong>Goal:</strong>
                <p>
                  ${fundraiser.goalAmount.toFixed(2)}
                </p>
              </div>


              <div>
                <strong>Raised:</strong>
                <p>
                  ${fundraiser.amountRaised.toFixed(2)}
                </p>
              </div>


              <div>
                <strong>Supporters:</strong>
                <p>
                  {fundraiser.surveySupporters}
                </p>
              </div>


              <div>
                <strong>Views:</strong>
                <p>
                  {fundraiser.views}
                </p>
              </div>


            </div>


          </div>

        )}


      </div>


    </main>

  );

}
