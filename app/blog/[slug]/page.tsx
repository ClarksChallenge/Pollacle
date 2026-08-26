import Link from "next/link";
import { notFound } from "next/navigation";

const posts = {
  "how-pollacle-works": {
    title: "How Pollacle Works",
    date: "August 26, 2026",
    content: (
      <>
        <p>
          Pollacle is built around a simple idea: people can support a
          fundraiser by sharing their opinions through market research surveys
          instead of making a cash donation.
        </p>

        <h2>Support without spending money</h2>

        <p>
          When someone chooses to support a Pollacle fundraiser, they can be
          connected with a research survey provided by our research partner.
          Completing an eligible survey can generate a credit for the
          fundraiser.
        </p>

        <h2>Where the surveys come from</h2>

        <p>
          Pollacle uses CPX Research survey technology to connect supporters
          with available market research opportunities.
        </p>

        <h2>What Pollacle is trying to accomplish</h2>

        <p>
          The goal is to create another way for people to help causes,
          projects, and fundraisers even when they cannot afford to contribute
          money directly.
        </p>

        <p>
          Pollacle is being built to make fundraising more accessible by
          turning people's time and opinions into another potential source of
          support.
        </p>
      </>
    ),
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Pollacle`,
    description:
      "Learn how Pollacle turns completed surveys into support for fundraisers.",
  };
}

export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = posts[params.slug as keyof typeof posts];

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <article className="mx-auto max-w-3xl px-6 py-16">
        <Link
          href="/blog"
          className="text-sm font-semibold text-purple-700 hover:text-purple-900"
        >
          ← Back to Blog
        </Link>

        <p className="mt-8 text-sm text-gray-500">{post.date}</p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          {post.title}
        </h1>

        <div className="prose prose-lg mt-10 max-w-none text-gray-700">
          {post.content}
        </div>
      </article>
    </main>
  );
}
