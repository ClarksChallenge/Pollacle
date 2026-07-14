import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";


export default async function AnalyticsPage() {


  const session = await getServerSession(authOptions);


  if (!session?.user?.email) {
    redirect("/login");
  }



  const user = await prisma.user.findUnique({

    where: {
      email: session.user.email,
    },

    include: {

      fundraisers: {

        orderBy: {
          createdAt: "desc",
        },

      },

    },

  });



  if (!user) {
    redirect("/login");
  }





  const totalViews = user.fundraisers.reduce(

    (sum, fundraiser) =>
      sum + fundraiser.views,

    0

  );




  const totalSupporters = user.fundraisers.reduce(

    (sum, fundraiser) =>
      sum + fundraiser.surveySupporters,

    0

  );




  const totalRaised = user.fundraisers.reduce(

    (sum, fundraiser) =>
      sum + fundraiser.amountRaised,

    0

  );




  const conversionRate = totalViews > 0

    ? ((totalSupporters / totalViews) * 100).toFixed(1)

    : "0";





  const averageSurveyValue = totalSupporters > 0

    ? (totalRaised / totalSupporters).toFixed(2)

    : "0.00";





  return (

    <main className="min-h-screen bg-gray-100 p-10">


      <div className="max-w-7xl mx-auto">



        <h1 className="text-4xl font-bold text-purple-700 mb-3">

          Creator Analytics

        </h1>



        <p className="text-gray-600 mb-10">

          Track how your surveys are turning into real impact.

        </p>








        <div className="grid md:grid-cols-4 gap-6 mb-10">



          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Views
            </p>

            <h2 className="text-4xl font-bold text-blue-600">
              {totalViews}
            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Supporters
            </p>

            <h2 className="text-4xl font-bold text-purple-700">
              {totalSupporters}
            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Conversion Rate
            </p>

            <h2 className="text-4xl font-bold text-green-600">
              {conversionRate}%
            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Revenue Generated
            </p>

            <h2 className="text-4xl font-bold">
              ${totalRaised.toFixed(2)}
            </h2>

          </div>



        </div>








        <div className="bg-white rounded-3xl shadow-xl p-8">



          <h2 className="text-2xl font-bold mb-6">

            Fundraiser Performance

          </h2>





          <div className="space-y-6">



            {user.fundraisers.map((fundraiser)=>{


              const rate = fundraiser.views > 0

              ? ((fundraiser.surveySupporters /
                fundraiser.views) * 100).toFixed(1)

              : "0";



              return (

                <div

                  key={fundraiser.id}

                  className="border rounded-2xl p-6"

                >



                  <div className="flex justify-between">


                    <h3 className="text-xl font-bold">

                      {fundraiser.title}

                    </h3>


                    <span className="text-green-600 font-bold">

                      {rate}% conversion

                    </span>


                  </div>





                  <div className="mt-4">


                    <div className="flex justify-between text-sm">

                      <span>
                        {fundraiser.views} views
                      </span>


                      <span>
                        {fundraiser.surveySupporters} supporters
                      </span>


                    </div>





                    <div className="h-3 bg-gray-200 rounded-full mt-2">


                      <div

                        className="h-full bg-purple-600 rounded-full"

                        style={{
                          width:`${Math.min(Number(rate),100)}%`
                        }}

                      />


                    </div>


                  </div>





                </div>

              );


            })}



          </div>




        </div>






      </div>



    </main>

  );

}
