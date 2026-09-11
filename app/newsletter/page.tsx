export default function NewsletterPage() {
  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-4xl mx-auto px-8 py-16">

        <h1 className="text-5xl font-bold text-purple-700">
          Pollacle Newsletter
        </h1>

        <p className="mt-8 text-lg text-gray-700 leading-8">
          Want to stay up to date with Pollacle?
        </p>

        <p className="mt-6 text-lg text-gray-700 leading-8">
          We are building the next version of Pollacle and exploring new ways
          for people to support causes, campaigns, creators, schools, and
          community organizations.
        </p>

        <div className="mt-10 bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-bold">
            Newsletter Coming Soon
          </h2>

          <p className="mt-4 text-gray-600 leading-7">
            We are setting up our newsletter so we can share product updates,
            new partnerships, campaign opportunities, and other Pollacle news.
          </p>

          <p className="mt-6 text-gray-600 leading-7">
            In the meantime, you can contact us if you would like to hear
            about upcoming Pollacle developments.
          </p>

          <p className="mt-6 font-semibold">
            <a
              href="mailto:support@pollacle.com"
              className="text-purple-700 hover:text-purple-900 underline"
            >
              support@pollacle.com
            </a>
          </p>

        </div>

      </div>
    </main>
  );
}
