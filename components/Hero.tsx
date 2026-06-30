import Image from "next/image";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-2 gap-12 items-center">

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
        </p>

        <div className="mt-8 flex gap-4 flex-wrap">
          <button className="bg-purple-700 text-white px-6 py-3 rounded-xl hover:bg-purple-800 transition">
            Start Making Impact
          </button>

          <button className="border border-purple-700 text-purple-700 px-6 py-3 rounded-xl hover:bg-purple-50 transition">
            Learn More
          </button>
        </div>
      </div>

      <div className="flex justify-center">
        <Image
          src="/octo.png"
          alt="Pollacle Mascot"
          width={450}
          height={450}
          priority
        />
      </div>

    </section>
  );
}