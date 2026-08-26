import Link from "next/link";

const posts = [
  {
    slug: "how-pollacle-works",
    title: "How Pollacle Works",
    description:
      "Learn how Pollacle turns completed market research surveys into support for fundraisers.",
    date: "August 26, 2026",
  },
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">Pollacle Blog</h1>
          <p className="mt-4 text-lg text-gray-600">
            Ideas, updates, fundraising tips, and the story behind Pollacle.
          </p>
        </div>

        <div className="grid gap-6">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm"
            >
              <p className="text-sm text-gray-500">{post.date}</p>

              <h2 className="mt-2 text-2xl font-bold text-gray-900">
                {post.title}
              </h2>

              <p className="mt-3 text-gray-600">{post.description}</p>

              <Link
                href={`/blog/${post.slug}`}
                className="mt-5 inline-block font-semibold text-purple-700 hover:text-purple-900"
              >
                Read article →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
