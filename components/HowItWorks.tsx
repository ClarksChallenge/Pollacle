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
        Pollacle turns survey participation into support for fundraisers.
        Supporters help causes without spending their own money.
      </p>



      <div className="grid md:grid-cols-3 gap-8 mt-14">


        <div className="bg-white rounded-2xl shadow-md p-8">

          <h3 className="text-2xl font-bold text-purple-700">
            📝 Complete Surveys
          </h3>

          <p className="mt-4 text-gray-600">
            Share your opinions through surveys provided by trusted
            research partners.
          </p>

        </div>




        <div className="bg-white rounded-2xl shadow-md p-8">

          <h3 className="text-2xl font-bold text-purple-700">
            💜 Generate Support
          </h3>

          <p className="mt-4 text-gray-600">
            Completed surveys create rewards that help power
            fundraising campaigns.
          </p>

        </div>




        <div className="bg-white rounded-2xl shadow-md p-8">

          <h3 className="text-2xl font-bold text-purple-700">
            🌎 Fund Causes
          </h3>

          <p className="mt-4 text-gray-600">
            Survey rewards are credited toward approved fundraisers
            and community goals.
          </p>

        </div>


      </div>


    </section>
  );
}
