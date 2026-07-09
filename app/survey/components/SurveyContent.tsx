"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SurveyContent() {

  const params = useSearchParams();

  const fundraiser = params.get("fundraiser");


  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">


      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10">


        {/* Pollacle */}

        <Image
          src="/pollacle.png"
          alt="Pollacle Mascot"
          width={160}
          height={160}
          className="mx-auto"
        />



        <h1 className="text-4xl font-bold text-center mt-4 mb-6">
          Support With Surveys
        </h1>



        <p className="text-center text-gray-600 text-lg mb-8">
          Complete surveys and help a fundraiser earn rewards.
          You never have to spend your own money.
        </p>





        {/* Fundraiser */}

        <div className="bg-purple-100 rounded-xl p-5 mb-8">


          <h2 className="font-bold text-lg">
            You're Supporting
          </h2>


          <p className="text-purple-700 text-xl font-semibold mt-2">
            {fundraiser || "Unknown Fundraiser"}
          </p>


        </div>





        {/* Survey Option */}

        <div className="border rounded-xl p-6 shadow-sm">


          <h2 className="text-2xl font-bold">
            Available Survey
          </h2>


          <h3 className="text-xl font-semibold mt-4">
            Consumer Opinion Survey
          </h3>


          <p className="text-gray-600 mt-2">
            Share your opinions to help companies improve their products
            and services.
          </p>



          <div className="flex justify-between mt-5">

            <span>
              Time: 10 minutes
            </span>


            <span className="font-bold text-green-600">
              Reward: $1.50
            </span>


          </div>



          <Link
            href={`/survey/start?fundraiser=${fundraiser}`}
            className="block mt-6 w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 rounded-xl text-center transition"
          >
            Start Survey
          </Link>


        </div>





        {/* Trust */}

        <div className="mt-8 text-center text-sm text-gray-500">


          <p>
            Pollacle is powered by trusted research partners.
          </p>


          <p className="mt-2">
            Honest answers help improve research quality.
          </p>


        </div>



      </div>


    </main>

  );
}
