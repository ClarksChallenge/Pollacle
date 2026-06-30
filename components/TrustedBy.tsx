export default function TrustedBy() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-8 text-center">

        <p className="text-sm font-semibold tracking-widest uppercase text-gray-500">
          Built for
        </p>

        <h2 className="mt-3 text-4xl font-bold text-purple-700">
          Communities That Want to Make an Impact
        </h2>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8">

          <div className="rounded-xl border p-6">
            🎥
            <h3 className="mt-3 font-semibold">Creators</h3>
          </div>

          <div className="rounded-xl border p-6">
            🏫
            <h3 className="mt-3 font-semibold">Schools</h3>
          </div>

          <div className="rounded-xl border p-6">
            ❤️
            <h3 className="mt-3 font-semibold">Nonprofits</h3>
          </div>

          <div className="rounded-xl border p-6">
            ⚽
            <h3 className="mt-3 font-semibold">Sports Teams</h3>
          </div>

        </div>

      </div>
    </section>
  );
}