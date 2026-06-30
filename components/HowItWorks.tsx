export default function HowItWorks() {
  return (
    <section className="max-w-6xl mx-auto px-8 py-20">

      <h2 className="text-4xl font-bold text-center text-purple-700">
        How Pollacle Works
      </h2>

      <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
        Every completed survey helps create value for brands while supporting
        causes that matter.
      </p>

      <div className="grid md:grid-cols-3 gap-8 mt-14">

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-700">
            📝 Take Surveys
          </h3>

          <p className="mt-4 text-gray-600">
            Answer surveys from trusted research partners.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-700">
            💰 Generate Funding
          </h3>

          <p className="mt-4 text-gray-600">
            Every completed survey helps generate funding.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-8">
          <h3 className="text-2xl font-bold text-purple-700">
            🌎 Make an Impact
          </h3>

          <p className="mt-4 text-gray-600">
            Support creators, schools, nonprofits, and communities.
          </p>
        </div>

      </div>

    </section>
  );
}