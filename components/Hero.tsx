import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">


      {/* Left Content */}

      <div>

        <h1 className="text-6xl md:text-7xl font-extrabold text-purple-700">
          Pollacle
        </h1>


        <h2 className="mt-4 text-2xl text-gray-700">
          Poll. Support. Make an Impact.
        </h2>



        <p className="mt-6 text-lg text-gray-600 leading-8">

          Turn survey participation into meaningful support for creators,
          nonprofits, schools, sports teams, and community organizations.

          No donation required.

        </p>




        <div className="mt-8 flex gap-4 flex-wrap">


          <Link
            href="/fundraisers"
            className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition font-semibold"
          >
            Support a Fundraiser
          </Link>



          <Link
            href="/about"
            className="border border-purple-700 text-purple-700 px-6 py-3 rounded-xl hover:bg-purple-50 transition font-semibold"
          >
            Learn More
          </Link>


        </div>



        <p className="mt-6 text-sm text-gray-500">
          Powered by CPX Research survey technology
        </p>


      </div>





      {/* Mascot */}

      <div className="flex justify-center">


        <Image
          src="/pollacle.png"
          alt="Pollacle purple octopus mascot"
          width={450}
          height={450}
          priority
        />


      </div>



    </section>
  );
}
