export default function WhyPollacle() {
  return (
    <section className="py-24 bg-purple-50">
      <div className="max-w-6xl mx-auto px-8">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-700">
            Why Choose Pollacle?
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Pollacle makes fundraising accessible by turning survey participation
            into support for organizations and causes people care about.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="text-4xl">💜</div>
            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              No Out-of-Pocket Donations
            </h3>
            <p className="mt-3 text-gray-600">
              Support campaigns through survey participation instead of spending
              your own money.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="text-4xl">📊</div>
            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              Trusted Research Partners
            </h3>
            <p className="mt-3 text-gray-600">
              Surveys are provided by established market research partners,
              creating value for both organizations and participants.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="text-4xl">🌍</div>
            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              Real Community Impact
            </h3>
            <p className="mt-3 text-gray-600">
              Help creators, schools, nonprofits, sports teams, and local
              communities reach their fundraising goals.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}