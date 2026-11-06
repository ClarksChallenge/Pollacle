const groups = [
  { name: "Creators", note: "Fund gear, projects, and studio time." },
  { name: "Schools", note: "Cover supplies and field trips." },
  { name: "Nonprofits", note: "Add another source of support." },
  { name: "Sports Teams", note: "Pay for uniforms, travel, and equipment." },
];

export default function TrustedBy() {
  return (
    <section className="py-16 bg-purple-50">
      <div className="max-w-6xl mx-auto px-8 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          Built for
        </p>

        <h2 className="mt-3 text-4xl font-bold text-purple-700">
          Communities That Want to Make an Impact
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {groups.map((group) => (
            <div key={group.name} className="rounded-xl bg-white p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900">{group.name}</h3>
              <p className="mt-2 text-sm text-gray-600">{group.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
