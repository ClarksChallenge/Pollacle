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

        <div className="mb-8 rounded-2xl border border-purple-200 bg-purple-50 p-5 text-left">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-purple-700">Creator tools</div>
          <h2 className="text-2xl font-bold text-purple-800">Quick Connect streaming</h2>
          <p className="mt-2 text-sm leading-6 text-gray-700">
            Connect a live stream service, launch a fundraising broadcast, and keep visitors on a secure Pollacle experience.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="/creator/connect"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-5 py-2.5 rounded-xl"
            >
              Connect stream
            </Link>
            <Link
              href="/card-linking"
              className="border border-purple-700 text-purple-700 hover:bg-purple-50 font-bold px-5 py-2.5 rounded-xl"
            >
              Card linking setup
            </Link>
          </div>
        </div>

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
