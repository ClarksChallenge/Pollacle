"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function StartSurveyContent() {

  const params = useSearchParams();

  const fundraiser = params.get("fundraiser") || "Unknown Fundraiser";

  const [completed, setCompleted] = useState(false);



  async function completeSurvey() {

    await fetch("/api/survey/complete", {

      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({

        slug: fundraiser,

        reward: 1.50

      }),

    });


    setCompleted(true);

  }




  if (completed) {

    return (

      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">


        <div className="max-w-xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">


          <h1 className="text-4xl font-bold text-purple-700 mb-6">
            Survey Complete!
          </h1>



          <p className="text-lg text-gray-700 mb-6">
            Thank you for completing this survey.
          </p>



          <div className="bg-green-100 rounded-xl p-6 mb-6">


            <p className="text-3xl font-bold text-green-700">
              + $1.50
            </p>


            <p className="mt-2">
              Reward earned for {fundraiser}
            </p>


          </div>



          <Link
            href={`/f/${fundraiser}`}
            className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl"
          >
            Return to Fundraiser
          </Link>



        </div>


      </main>

    );

  }





  return (

    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">


      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10">


        <h1 className="text-4xl font-bold text-center mb-6">
          Consumer Opinion Survey
        </h1>



        <p className="text-center text-gray-600 mb-8">
          Your honest answers help organizations understand customer opinions.
        </p>





        <div className="space-y-8">



          <div>

            <h2 className="font-bold text-lg mb-3">
              Question 1
            </h2>


            <p>
              How often do you purchase products online?
            </p>


            <select className="mt-3 w-full border rounded-lg p-3">

              <option>
                Select an answer
              </option>

              <option>
                Every week
              </option>

              <option>
                Every month
              </option>

              <option>
                Occasionally
              </option>

            </select>


          </div>





          <div>

            <h2 className="font-bold text-lg mb-3">
              Question 2
            </h2>


            <p>
              What matters most when choosing a product?
            </p>


            <select className="mt-3 w-full border rounded-lg p-3">


              <option>
                Select an answer
              </option>


              <option>
                Price
              </option>


              <option>
                Quality
              </option>


              <option>
                Reviews
              </option>


            </select>


          </div>






          <div>

            <h2 className="font-bold text-lg mb-3">
              Question 3
            </h2>


            <p>
              How likely are you to recommend products you enjoy?
            </p>


            <select className="mt-3 w-full border rounded-lg p-3">


              <option>
                Select an answer
              </option>


              <option>
                Very likely
              </option>


              <option>
                Maybe
              </option>


              <option>
                Unlikely
              </option>


            </select>


          </div>




        </div>





        <button

          onClick={completeSurvey}

          className="mt-10 w-full bg-purple-600 hover:bg-purple-700 text-white text-xl font-bold py-4 rounded-xl"

        >

          Complete Survey

        </button>




      </div>


    </main>

  );

}
