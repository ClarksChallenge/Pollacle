"use client";

import Link from "next/link";

export default function CreateFundraiserPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">


        {/* Mascot */}

        <div className="flex justify-center mb-6">

          <div className="text-7xl">
            🐙
          </div>

        </div>



        {/* Title */}

        <h1 className="text-4xl font-extrabold text-purple-700">
          Pollacle Launch Mode
        </h1>



        <p className="mt-5 text-gray-600 text-lg leading-8">

          Fundraiser creation is temporarily limited while Pollacle
          completes its first live launch test.

        </p>




        {/* Launch Box */}

        <div className="mt-8 bg-purple-50 rounded-2xl p-6">


          <h2 className="font-bold text-purple-700 text-xl">

            🐙 Single-Founder Launch

          </h2>



          <p className="mt-3 text-gray-600 leading-7">

            Pollacle is currently testing the complete
            survey-to-support system with our first official campaign.

            This allows us to verify survey tracking,
            CPX Research connections, rewards, and fundraiser reporting
            before opening the platform to more creators.

          </p>


        </div>




        {/* What happens next */}

        <div className="mt-6 text-left bg-gray-50 rounded-xl p-5">


          <h3 className="font-bold text-gray-800 mb-3">

            Coming Soon

          </h3>


          <ul className="space-y-2 text-gray-600">

            <li>
              ✅ Creator accounts
            </li>

            <li>
              ✅ Public fundraiser creation
            </li>

            <li>
              ✅ Community campaigns
            </li>

            <li>
              ✅ Expanded survey support

            </li>

          </ul>


        </div>





        <Link
          href="/"
          className="inline-block mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl transition"
        >

          Return Home

        </Link>



      </div>


    </main>
  );
}
