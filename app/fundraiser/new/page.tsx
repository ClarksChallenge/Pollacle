export default function NewFundraiserPage() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center px-6">

      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl p-10 text-center">

        {/* Mascot */}
        <div className="flex justify-center mb-6">
          <div className="text-7xl" />
        </div>

        <h1 className="text-4xl font-extrabold text-purple-700">
          Pollacle Is Evolving
        </h1>

        <p className="mt-5 text-gray-600 text-lg leading-8">
          New fundraiser creation is temporarily paused while we build the
          next version of Pollacle around more reliable ways to support
          campaigns.
        </p>

        <div className="mt-8 bg-purple-50 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-purple-700">
            Building a Better Support Model
          </h2>

          <p className="mt-3 text-gray-600 leading-7">
            We are developing a platform focused on transparent community
            support, partnerships, sponsorship opportunities, and meaningful
            ways for people to help campaigns reach their goals.
          </p>

        </div>

        <div className="mt-6 bg-gray-50 rounded-xl p-5 text-left">

          <h3 className="font-bold text-gray-800 mb-3">
            What&apos;s Coming
          </h3>

          <ul className="space-y-2 text-gray-600">

            <li>
              🤝 Community support opportunities
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

        <p className="mt-6 text-purple-700 font-semibold">
          Thank you for being part of Pollacle&apos;s next chapter.
        </p>

      </div>

    </main>
  );
}
