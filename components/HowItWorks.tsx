export default function HowItWorks() {
  return (
    <section
      id="how"
      className="max-w-6xl mx-auto px-8 py-20"
    >
      <h2 className="text-4xl font-bold text-center text-purple-700">
        How Pollacle Works
      </h2>

      <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
        Pollacle is building new ways for people to support campaigns through
        meaningful participation, reliable opportunities, and community action.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-14">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-700">
            🔎 Find a Campaign
          </h3>

          <p className="mt-4 text-gray-600">
            Discover creators, nonprofits, schools, teams, and community
            organizations working toward goals that matter.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-700">
            🤝 Get Involved
          </h3>

          <p className="mt-4 text-gray-600">
            Take part in opportunities designed to let you contribute your
            time, attention, skills, or participation.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-700">
            💜 Create Support
          </h3>

          <p className="mt-4 text-gray-600">
            Your participation helps campaigns build momentum and move closer
            to their goals.
          </p>
        </div>
      </div>
    </section>
  );
}
