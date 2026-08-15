import Link from "next/link";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-lg w-full">
        <div className="inline-flex items-center justify-center rounded-full bg-purple-100 text-purple-700 px-4 py-2 text-sm font-semibold mb-6">
          Private Testing
        </div>

        <h1 className="text-4xl font-bold text-purple-700 mb-4">
          Creator access is currently paused
        </h1>

        <p className="text-gray-600 mb-8 leading-7">
          We’re keeping the platform in a closed testing mode while we validate the full creator and
          fundraiser experience. Access will reopen once the platform is ready for broader launch.
        </p>

        <div className="space-y-3">
          <Link
            href="/"
            className="block w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl"
          >
            Return Home
          </Link>

          <Link
            href="/fundraisers"
            className="block w-full border border-purple-600 text-purple-700 hover:bg-purple-50 font-bold py-4 rounded-xl"
          >
            Browse Fundraisers
          </Link>
        </div>
      </div>
    </main>
  );
}
