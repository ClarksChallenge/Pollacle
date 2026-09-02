import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

function getPosts() {
  const blogDirectory = path.join(process.cwd(), "content/blog");

  const files = fs.readdirSync(blogDirectory);

  return files
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const filePath = path.join(blogDirectory, file);
      const fileContent = fs.readFileSync(filePath, "utf8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
      };
    })
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}

export default function BlogPage() {
  const posts = getPosts();

  return (
    <main className="min-h-screen bg-gray-50">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Pollacle Blog
          </h1>

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

              <p className="mt-3 text-gray-600">
                {post.description}
              </p>

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
