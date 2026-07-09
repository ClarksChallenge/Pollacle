"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fundraiser = {
  id: string;
  slug: string;
  title: string;
  story: string;
  category: string;
  goalAmount: number;
  amountRaised: number;
  surveySupporters: number;
  status: string;
};


export default function DashboardPage() {

  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [copied, setCopied] = useState<string | null>(null);



  useEffect(() => {

    async function loadFundraisers() {

      const res = await fetch("/api/fundraiser");

      const data = await res.json();

      setFundraisers(data);

    }


    loadFundraisers();

  }, []);





  async function copyLink(slug:string) {

    const url =
      `${window.location.origin}/f/${slug}`;


    await navigator.clipboard.writeText(url);


    setCopied(slug);


    setTimeout(()=>{

      setCopied(null);

    },2000);

  }






  const totalRaised = fundraisers.reduce(
    (sum,f)=>sum + f.amountRaised,
    0
  );


  const totalSupporters = fundraisers.reduce(
    (sum,f)=>sum + f.surveySupporters,
    0
  );





  return (

    <main className="min-h-screen bg-gray-50">


      {/* Header */}

      <header className="bg-white border-b">

        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center">


          <Link
            href="/"
            className="text-2xl font-bold text-purple-700"
          >
            🐙 Pollacle
          </Link>



          <Link

            href="/create"

            className="bg-purple-700 text-white px-5 py-3 rounded-xl font-semibold"

          >
            + Create Fundraiser
          </Link>


        </div>


      </header>





      <section className="max-w-7xl mx-auto px-8 py-12">


        <h1 className="text-4xl font-bold">

          Creator Dashboard

        </h1>


        <p className="text-gray-600 mt-2">

          Track your fundraiser impact and share your campaign.

        </p>






        {/* Stats */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">


          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Fundraisers
            </p>

            <p className="text-4xl font-bold text-purple-700">
              {fundraisers.length}
            </p>

          </div>




          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Total Raised
            </p>

            <p className="text-4xl font-bold text-green-600">
              ${totalRaised.toFixed(2)}
            </p>

          </div>




          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Supporters
            </p>

            <p className="text-4xl font-bold text-purple-700">
              {totalSupporters}
            </p>

          </div>



        </div>






        {/* Campaigns */}

        <div className="mt-12">


          <h2 className="text-3xl font-bold mb-6">

            My Fundraisers

          </h2>





          {fundraisers.length === 0 ? (

            <div className="bg-white rounded-2xl p-10 text-center shadow">


              <h3 className="text-2xl font-bold">

                No fundraisers yet

              </h3>


              <p className="text-gray-500 mt-3">

                Create your first campaign and start earning support.

              </p>



              <Link

                href="/create"

                className="inline-block mt-6 bg-purple-700 text-white px-6 py-3 rounded-xl"

              >
                Create Fundraiser
              </Link>


            </div>


          ) : (


            <div className="grid lg:grid-cols-2 gap-8">



              {fundraisers.map((fundraiser)=>{


                const percent =
                  fundraiser.goalAmount > 0
                    ?
                    Math.min(
                      100,
                      (fundraiser.amountRaised /
                      fundraiser.goalAmount)
                      *100
                    )
                    :
                    0;




                return (

                  <div

                    key={fundraiser.id}

                    className="bg-white rounded-2xl shadow p-6"

                  >



                    <h3 className="text-2xl font-bold">

                      {fundraiser.title}

                    </h3>



                    <p className="text-gray-500 mt-2 line-clamp-2">

                      {fundraiser.story}

                    </p>





                    <div className="mt-6 flex justify-between">

                      <span className="font-bold text-green-600">

                        ${fundraiser.amountRaised.toFixed(2)}

                      </span>


                      <span>

                        Goal ${fundraiser.goalAmount.toFixed(2)}

                      </span>


                    </div>





                    <div className="mt-3 h-4 bg-gray-200 rounded-full">


                      <div

                        className="h-4 bg-purple-600 rounded-full"

                        style={{
                          width:`${percent}%`
                        }}

                      />


                    </div>




                    <div className="mt-4 text-sm text-gray-500">

                      {fundraiser.surveySupporters}
                      {" "}
                      supporters

                    </div>






                    <div className="mt-6 flex gap-3">


                      <Link

                        href={`/f/${fundraiser.slug}`}

                        className="flex-1 text-center bg-purple-700 text-white py-3 rounded-xl"

                      >

                        View

                      </Link>



                      <button

                        onClick={()=>copyLink(fundraiser.slug)}

                        className="flex-1 border border-purple-700 text-purple-700 py-3 rounded-xl"

                      >

                        {copied === fundraiser.slug
                          ?
                          "Copied!"
                          :
                          "Share"
                        }


                      </button>


                    </div>





                  </div>


                );


              })}



            </div>


          )}



        </div>


      </section>


    </main>

  );

}
