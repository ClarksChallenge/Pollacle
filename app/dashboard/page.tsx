import Link from "next/link";

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-16">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-200 p-10 text-center">
        <div className="inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-700 px-4 py-2 text-sm font-semibold mb-6">
          Private Testing
        </div>

        <h1 className="text-4xl font-extrabold text-purple-700 mb-4">
          Creator dashboard is temporarily locked
        </h1>

        <p className="text-lg text-gray-600 leading-8 mb-8">
          We’re currently running a closed beta to validate the full Pollacle creator experience,
          including fundraising flows, survey quality, and supporter journeys. Access is intentionally
          limited while we refine the platform before opening it up more broadly.
        </p>

        <p className="text-gray-600 mb-8">
          Thanks for helping us test the product behind the scenes. We’ll reopen creator access as soon
          as the experience is ready for public launch.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            href="/"
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-3 rounded-xl"
          >
            Return Home
          </Link>

          <Link
            href="/fundraisers"
            className="border border-purple-700 text-purple-700 hover:bg-purple-50 font-bold px-8 py-3 rounded-xl"
          >
            Browse Fundraisers
          </Link>
        </div>
      </div>
    </main>
  );
}
