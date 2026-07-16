"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fundraiser = {
  id: string;
  title: string;
  story: string;
  slug: string;
  goalAmount: number;
  amountRaised: number;
};

export default function FeaturedFundraisers() {

  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {

    async function load() {

      try {

        const res = await fetch("/api/fundraiser");

        const data = await res.json();


        if (Array.isArray(data)) {
          setFundraisers(data);
        } else {
          setFundraisers([]);
        }


      } catch (error) {
        // Don't leak sensitive details in the UI console; warn for debugging
        // eslint-disable-next-line no-console
        console.warn("Failed to load fundraisers", error);
        setFundraisers([]);
      } finally {

        setLoading(false);

      }

    }


    load();

  }, []);



  return (

    <section className="max-w-6xl mx-auto px-8 py-20">


      <h2 className="text-4xl font-bold text-center text-purple-700">
        Featured Fundraisers
      </h2>


      <p className="text-center text-gray-600 mt-4">
        Support causes that matter by completing surveys.
      </p>



      {loading && (

        <p className="text-center mt-10">
          Loading fundraisers...
        </p>

      )}



      {!loading && fundraisers.length === 0 && (

        <p className="text-center mt-10 text-gray-500">
          No fundraisers available yet.
        </p>

      )}



      <div className="grid md:grid-cols-3 gap-8 mt-12">


        {fundraisers.map((fundraiser) => {


          const percent =
            fundraiser.goalAmount > 0
              ? Math.min(
                  100,
                  (fundraiser.amountRaised /
                    fundraiser.goalAmount) *
                    100
                )
              : 0;



          return (

            <div
              key={fundraiser.id}
              className="bg-white rounded-2xl shadow-lg p-6"
            >


              <h3 className="text-2xl font-bold mb-3">
                {fundraiser.title}
              </h3>


              <p className="text-gray-600 line-clamp-3">
                {fundraiser.story}
              </p>



              <div className="mt-5 flex justify-between text-sm">

                <span className="font-bold">
                  ${fundraiser.amountRaised.toFixed(2)}
                </span>

                <span>
                  Goal ${fundraiser.goalAmount.toFixed(2)}
                </span>

              </div>



              <div className="w-full bg-gray-200 h-3 rounded-full mt-3">

                <div
                  className="bg-purple-600 h-3 rounded-full"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>



              <Link
                href={`/f/${fundraiser.slug}`}
                className="block mt-6 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
              >
                Support This Fundraiser
              </Link>


            </div>

          );

        })}


      </div>


    </section>

  );

}
