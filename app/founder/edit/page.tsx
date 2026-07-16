import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export default async function FounderEditPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  if (!user) {
    redirect("/login");
  }

  const fundraiser = await prisma.fundraiser.findFirst({
    where: {
      userId: user.id,
    },
  });

  if (!fundraiser) {
    redirect("/founder");
  }

  return (
    <main className="min-h-screen bg-gray-100 py-12">

      <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-xl p-10">

        <h1 className="text-4xl font-bold text-purple-700 mb-2">
          Edit Launch Fundraiser
        </h1>

        <p className="text-gray-600 mb-8">
          Changes made here are reflected immediately on your live fundraiser.
        </p>

        <form
          action="/api/fundraiser/update"
          method="POST"
          className="space-y-6"
        >
          <input
            type="hidden"
            name="id"
            value={fundraiser.id}
          />

          <div>
            <label className="block font-semibold mb-2">
              Title
            </label>

            <input
              name="title"
              defaultValue={fundraiser.title}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Story
            </label>

            <textarea
              name="story"
              defaultValue={fundraiser.story}
              rows={8}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Category
            </label>

            <select
              name="category"
              defaultValue={fundraiser.category}
              className="w-full border rounded-xl p-3"
            >
              <option>Medical</option>
              <option>Education</option>
              <option>Animals</option>
              <option>Emergency</option>
              <option>Community</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-2">
              Goal Amount
            </label>

            <input
              type="number"
              name="goalAmount"
              defaultValue={fundraiser.goalAmount}
              className="w-full border rounded-xl p-3"
              required
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">

            <button
              type="submit"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-3 rounded-xl"
            >
              Save Changes
            </button>

            <a
              href={`/f/${fundraiser.slug}`}
              className="border border-purple-700 text-purple-700 font-bold px-8 py-3 rounded-xl hover:bg-purple-50"
            >
              View Live Page
            </a>

            <a
              href="/founder"
              className="border px-8 py-3 rounded-xl"
            >
              Back to Founder Panel
            </a>

          </div>

        </form>

      </div>

    </main>
  );
}
