export default function WhyPollacle() {
  return (
    <section className="py-24 bg-purple-50">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-purple-700">
            Why Choose Pollacle?
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Pollacle is building a more reliable way for people to support
            organizations, communities, and causes they care about.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="text-4xl">💜</div>
            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              Support Without Pressure
            </h3>
            <p className="mt-3 text-gray-600">
              We&apos;re exploring ways for people to contribute through their
              time, participation, and everyday actions instead of relying
              entirely on traditional donations.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="text-4xl">🤝</div>
            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              Built Around Reliability
            </h3>
            <p className="mt-3 text-gray-600">
              Pollacle is moving toward transparent opportunities and
              partnerships that create a clearer, more dependable experience
              for supporters and campaign creators.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-8 shadow-md">
            <div className="text-4xl">🌍</div>
            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              Real Community Impact
            </h3>
            <p className="mt-3 text-gray-600">
              Help creators, schools, nonprofits, sports teams, and local
              communities build momentum toward their goals.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
