import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/app/lib/prisma";

export default async function FundraisersPage() {

  const fundraisers = await prisma.fundraiser.findMany({

    where: {
      status: "ACTIVE",
    },

    orderBy: {
      createdAt: "desc",
    },

  });


  return (

    <main className="min-h-screen bg-gray-50">


      {/* Header */}

      <section className="bg-purple-700 text-white py-16">

        <div className="max-w-7xl mx-auto px-8">

          <Link
            href="/"
            className="text-purple-200 hover:text-white"
          >
            ← Back to Pollacle
          </Link>


          <h1 className="text-5xl font-bold mt-8">
            Browse Fundraisers
          </h1>


          <p className="mt-4 text-lg text-purple-100 max-w-3xl">
            Discover causes you can support by completing surveys.
            Every completed survey helps create real impact.
          </p>


        </div>

      </section>




      <section className="max-w-7xl mx-auto px-8 py-12">


        {fundraisers.length === 0 ? (

          <div className="bg-white rounded-2xl shadow p-10 text-center">


            <div className="text-6xl">
              🐙
            </div>


            <h2 className="text-3xl font-bold mt-5">
              No Fundraisers Yet
            </h2>


            <p className="text-gray-500 mt-3">
              Be the first person to create a Pollacle fundraiser.
            </p>


            <Link
              href="/create"
              className="inline-block mt-6 bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold"
            >
              Start a Fundraiser
            </Link>


          </div>


        ) : (


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


            {fundraisers.map((fundraiser) => {


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
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >


                  {/* Image Area */}

                  <div className="h-40 bg-purple-100 flex items-center justify-center">


                    {fundraiser.coverImage ? (

                      <Image
                        src={fundraiser.coverImage}
                        alt={fundraiser.title}
                        width={400}
                        height={200}
                        className="w-full h-full object-cover"
                      />

                    ) : (

                      <div className="text-6xl">
                        🐙
                      </div>

                    )}


                  </div>





                  <div className="p-6">


                    <div className="flex justify-between items-center">


                      <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">

                        {fundraiser.category}

                      </span>


                    </div>




                    <h2 className="text-2xl font-bold mt-4">

                      {fundraiser.title}

                    </h2>



                    <p className="mt-3 text-gray-600 line-clamp-3">

                      {fundraiser.story}

                    </p>





                    {/* Progress */}

                    <div className="mt-6">


                      <div className="flex justify-between text-sm mb-2">

                        <span className="font-semibold">
                          ${fundraiser.amountRaised.toFixed(2)}
                        </span>


                        <span>
                          Goal ${fundraiser.goalAmount.toFixed(2)}
                        </span>


                      </div>



                      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">


                        <div
                          className="h-3 bg-purple-600 rounded-full"
                          style={{
                            width: `${percent}%`,
                          }}
                        />


                      </div>


                    </div>





                    <div className="mt-6 flex justify-between items-center">


                      <span className="text-sm text-gray-500">

                        {fundraiser.surveySupporters} supporters

                      </span>



                      <Link

                        href={`/f/${fundraiser.slug}`}

                        className="bg-purple-700 hover:bg-purple-800 text-white px-5 py-2 rounded-xl font-semibold"

                      >

                        Support →

                      </Link>


                    </div>



                  </div>


                </div>

              );


            })}


          </div>


        )}


      </section>


    </main>

  );

}
