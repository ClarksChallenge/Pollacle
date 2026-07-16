import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";


export default async function DashboardPage() {


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





  const totalRaised = user.fundraisers.reduce(
    (sum, fundraiser) =>
      sum + fundraiser.amountRaised,
    0
  );



  const totalSupporters = user.fundraisers.reduce(
    (sum, fundraiser) =>
      sum + fundraiser.surveySupporters,
    0
  );



  const totalViews = user.fundraisers.reduce(
    (sum, fundraiser) =>
      sum + fundraiser.views,
    0
  );





  return (

    <main className="min-h-screen bg-gray-100">


      <div className="max-w-7xl mx-auto px-6 py-12">



        <div className="flex items-center justify-between mb-10">


          <div>

            <h1 className="text-4xl font-bold text-purple-700">
              Creator Dashboard
            </h1>


            <p className="text-gray-600 mt-2">
              Welcome back, {user.name || "Founder"} 👋
            </p>

          </div>



          <Link

            href="/dashboard/analytics"

            className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-xl font-bold"

          >

            📊 Analytics

          </Link>



        </div>







        <div className="grid md:grid-cols-4 gap-6 mb-10">



          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Fundraisers
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {user.fundraisers.length}
            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Total Raised
            </p>

            <h2 className="text-4xl font-bold text-green-600 mt-2">
              ${totalRaised.toFixed(2)}
            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Survey Supporters
            </p>

            <h2 className="text-4xl font-bold text-purple-700 mt-2">
              {totalSupporters}
            </h2>

          </div>





          <div className="bg-white rounded-2xl shadow p-6">

            <p className="text-gray-500">
              Total Views
            </p>

            <h2 className="text-4xl font-bold text-blue-600 mt-2">
              {totalViews}
            </h2>

          </div>



        </div>









        <div className="bg-white rounded-3xl shadow-xl p-8">



          <h2 className="text-2xl font-bold mb-6">
            Pollacle Launch Fundraiser
          </h2>





          {user.fundraisers.length === 0 ? (


            <div className="text-center py-16">


              <p className="text-gray-500">
                No fundraiser connected yet.
              </p>


            </div>


          ) : (



            <div className="space-y-6">


              {user.fundraisers.map((fundraiser) => {



                const percent =

                  fundraiser.goalAmount > 0

                    ? Math.min(

                        100,

                        (fundraiser.amountRaised /
                        fundraiser.goalAmount) * 100

                      )

                    : 0;





                return (



                  <div

                    key={fundraiser.id}

                    className="border rounded-2xl p-6 hover:shadow-lg transition"

                  >




                    <div className="flex justify-between items-start">



                      <div>

                        <h3 className="text-2xl font-bold">

                          {fundraiser.title}

                        </h3>


                        <p className="text-gray-500 mt-2">

                          {fundraiser.category}

                        </p>


                      </div>






                      <Link

                        href={`/f/${fundraiser.slug}`}

                        className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-lg font-semibold"

                      >

                        View

                      </Link>



                    </div>







                    <div className="mt-6">


                      <div className="flex justify-between text-sm font-semibold">


                        <span>
                          ${fundraiser.amountRaised.toFixed(2)}
                        </span>


                        <span>
                          Goal ${fundraiser.goalAmount.toFixed(2)}
                        </span>


                      </div>





                      <div className="mt-2 h-3 rounded-full bg-gray-200 overflow-hidden">


                        <div

                          className="bg-purple-600 h-full"

                          style={{
                            width:`${percent}%`
                          }}

                        />


                      </div>


                    </div>









                    <div className="grid grid-cols-4 gap-4 mt-6 text-center">



                      <div>

                        <div className="font-bold text-xl">
                          {fundraiser.views}
                        </div>

                        <div className="text-gray-500 text-sm">
                          Views
                        </div>

                      </div>





                      <div>

                        <div className="font-bold text-xl">
                          {fundraiser.surveySupporters}
                        </div>

                        <div className="text-gray-500 text-sm">
                          Supporters
                        </div>

                      </div>





                      <div>

                        <div className="font-bold text-xl">
                          ${fundraiser.amountRaised.toFixed(2)}
                        </div>

                        <div className="text-gray-500 text-sm">
                          Raised
                        </div>

                      </div>





                      <div>

                        <div className="font-bold text-green-600">
                          {fundraiser.status}
                        </div>

                        <div className="text-gray-500 text-sm">
                          Status
                        </div>

                      </div>



                    </div>




                  </div>


                );


              })}



            </div>


          )}



        </div>




      </div>



    </main>


  );

}
