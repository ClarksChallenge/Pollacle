"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export default function NewFundraiserPage() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [story, setStory] = useState("");
  const [category, setCategory] = useState("general");
  const [goalAmount, setGoalAmount] = useState(1000);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const slug = slugify(title);

    try {
      const res = await fetch("/api/fundraiser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          story,
          category,
          goalAmount,
          slug,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to create fundraiser");
      }

      const data = await res.json();

      // redirect to future public page
      router.push(`/f/${data.slug}`);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create Fundraiser</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border p-2"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="w-full border p-2"
          placeholder="Story"
          value={story}
          onChange={(e) => setStory(e.target.value)}
          rows={5}
          required
        />

        <input
          className="w-full border p-2"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full border p-2"
          type="number"
          placeholder="Goal Amount"
          value={goalAmount}
          onChange={(e) => setGoalAmount(Number(e.target.value))}
        />

        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded w-full"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Fundraiser"}
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </form>
    </div>
  );
}
