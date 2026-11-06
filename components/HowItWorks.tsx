const steps = [
  {
    title: "Find a Campaign",
    body: "Discover creators, schools, nonprofits, and teams working toward a goal.",
  },
  {
    title: "Get Involved",
    body: "Explore opportunities to support campaigns through participation and engagement.",
  },
  {
    title: "Make an Impact",
    body: "Help campaigns build momentum and move closer to their goals.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="max-w-6xl mx-auto px-8 py-20">
      <h2 className="text-4xl font-bold text-center text-purple-700">
        How Pollacle Works
      </h2>

      <div className="grid md:grid-cols-3 gap-8 mt-14">
        {steps.map((step, i) => (
          <div key={step.title} className="bg-white rounded-2xl shadow-md p-8">
            <span
              aria-hidden="true"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-700 text-lg font-bold text-white"
            >
              {i + 1}
            </span>

            <h3 className="mt-4 text-2xl font-bold text-purple-700">
              {step.title}
            </h3>

            <p className="mt-3 text-gray-600">{step.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
