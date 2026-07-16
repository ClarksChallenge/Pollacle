import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export default async function FounderPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      fundraisers: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!user) {
    redirect("/login");
  }

  const fundraiser = user.fundraisers[0];

  const totalRaised = fundraiser?.amountRaised ?? 0;
  const totalViews = fundraiser?.views ?? 0;
  const supporters = fundraiser?.surveySupporters ?? 0;
  const goal = fundraiser?.goalAmount ?? 0;

  const percent =
    goal > 0
      ? Math.min(100, (totalRaised / goal) * 100)
      : 0;

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-6xl mx-auto py-12 px-6">

        <h1 className="text-5xl font-bold text-purple-700">
          Founder Admin
        </h1>

        <p className="mt-2 text-gray-600">
          Private control panel for the Pollacle launch.
        </p>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Raised</p>
            <h2 className="text-4xl font-bold text-green-600">
              ${totalRaised.toFixed(2)}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Supporters</p>
            <h2 className="text-4xl font-bold text-purple-700">
              {supporters}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Views</p>
            <h2 className="text-4xl font-bold text-blue-600">
              {totalViews}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Progress</p>
            <h2 className="text-4xl font-bold">
              {percent.toFixed(0)}%
            </h2>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl mt-10 p-8">

          <h2 className="text-3xl font-bold">
            Launch Fundraiser
          </h2>

          {fundraiser ? (
            <>
              <h3 className="text-2xl mt-6 font-bold">
                {fundraiser.title}
              </h3>

              <p className="mt-4 text-gray-600">
                {fundraiser.story}
              </p>

              <div className="mt-8 h-5 rounded-full bg-gray-200 overflow-hidden">

                <div
                  className="bg-purple-600 h-full"
                  style={{
                    width: `${percent}%`,
                  }}
                />

              </div>

              <div className="mt-10 flex flex-wrap gap-4">

                <Link
                  href="/founder/edit"
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-bold"
                >
                  Edit Fundraiser
                </Link>

                <Link
                  href="/founder/analytics"
                  className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-6 py-3 rounded-xl font-bold"
                >
                  Analytics
                </Link>

                <Link
                  href={`/f/${fundraiser.slug}`}
                  className="bg-green-100 hover:bg-green-200 text-green-700 px-6 py-3 rounded-xl font-bold"
                >
                  View Live Page
                </Link>

                <Link
                  href="/founder/settings"
                  className="bg-gray-200 hover:bg-gray-300 px-6 py-3 rounded-xl font-bold"
                >
                  Settings
                </Link>

              </div>
            </>
          ) : (
            <p className="mt-6 text-gray-500">
              No fundraiser found for this account.
            </p>
          )}

        </div>

      </div>

    </main>
  );
}
