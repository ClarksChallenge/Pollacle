import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-10">

      <h1 className="text-6xl font-bold text-purple-700">
        Pollacle
      </h1>

      <p className="mt-4 text-xl text-gray-600 text-center max-w-xl">
        Turn opinions into real-world impact through surveys that support creators and communities.
      </p>

      <button className="mt-8 bg-purple-700 text-white px-6 py-3 rounded-xl">
        Start Making Impact
      </button>

      <div className="mt-10">
        <Image
          src="/octo.png"
          alt="Pollacle Mascot"
          width={400}
          height={400}
        />
      </div>

    </main>
  );
}