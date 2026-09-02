import fs from "fs";
import path from "path";
import { marked } from "marked";
import matter from "gray-matter";
import { notFound } from "next/navigation";
import Link from "next/link";

function getPost(slug: string) {
  const filePath = path.join(
    process.cwd(),
    "content/blog",
    `${slug}.md`
  );

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContent);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    content: marked.parse(content),
  };
}

export async function generateStaticParams() {
  const blogDirectory = path.join(process.cwd(), "content/blog");

  const files = fs
    .readdirSync(blogDirectory)
    .filter((file) => file.endsWith(".md"));

  return files.map((file) => ({
    slug: file.replace(/\.md$/, ""),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);

  if (!post) {
    return {};
  }

  return {
    title: `${post.title} | Pollacle`,
    description: post.description,
  };
}

export default function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPost(params.slug);

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

        <p className="mt-8 text-sm text-gray-500">
          {post.date}
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          {post.title}
        </h1>

        <div
          className="prose prose-lg mt-10 max-w-none text-gray-700"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}
