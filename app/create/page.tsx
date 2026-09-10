"use client";

import Link from "next/link";

export default function CreateFundraiserPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">

        {/* Mascot */}
        <div className="flex justify-center mb-6">
          <div className="text-7xl"></div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-purple-700">
          Pollacle Is Evolving
        </h1>

        <p className="mt-5 text-gray-600 text-lg leading-8">
          We are rebuilding Pollacle around more reliable and transparent
          ways for people, organizations, and partners to support campaigns.
        </p>

        {/* New Direction */}
        <div className="mt-8 bg-purple-50 rounded-2xl p-6">
          <h2 className="font-bold text-purple-700 text-xl">
            Building What Comes Next
          </h2>

          <p className="mt-3 text-gray-600 leading-7">
            Our original launch helped us learn what works and what does not.
            We are now developing a new model focused on community support,
            partnerships, sponsorship opportunities, and meaningful ways to
            help campaigns reach their goals.
          </p>
        </div>

        {/* What happens next */}
        <div className="mt-6 text-left bg-gray-50 rounded-xl p-5">
          <h3 className="font-bold text-gray-800 mb-3">
            Coming Soon
          </h3>

          <ul className="space-y-2 text-gray-600">
            <li>
              🤝 New community support opportunities
            </li>

            <li>
              🏢 Partner and sponsorship opportunities
            </li>

            <li>
              💜 More ways to support campaigns
            </li>

            <li>
              🚀 Expanded creator and organization tools
            </li>
          </ul>
        </div>

        <Link
          href="/fundraisers"
          className="inline-block mt-8 bg-purple-600 hover:bg-purple-700 text-white font-bold px-8 py-4 rounded-xl transition"
        >
          Browse Fundraisers
        </Link>

        <div>
          <Link
            href="/"
            className="inline-block mt-4 text-purple-700 hover:text-purple-900 font-semibold"
          >
            Return Home
          </Link>
        </div>

      </div>
    </main>
  );
}
