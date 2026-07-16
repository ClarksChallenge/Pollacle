import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";

import { authOptions } from "@/app/lib/auth";
import { prisma } from "@/app/lib/prisma";

export default async function FounderAnalyticsPage() {
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

  const surveyStarts = await prisma.surveySession.count({
    where: {
      fundraiserId: fundraiser.id,
    },
  });

  const surveyCompleted = await prisma.surveySession.count({
    where: {
      fundraiserId: fundraiser.id,
      status: "COMPLETED",
    },
  });

  const completions = await prisma.surveyCompletion.findMany({
    where: {
      fundraiserId: fundraiser.id,
    },
    orderBy: {
      completedAt: "desc",
    },
    take: 20,
  });

  const totalRevenue = completions.reduce(
    (sum, item) => sum + item.rewardAmount,
    0
  );

  const averageReward =
    completions.length > 0
      ? totalRevenue / completions.length
      : 0;

  const completionRate =
    surveyStarts > 0
      ? (surveyCompleted / surveyStarts) * 100
      : 0;

  const clickRate =
    fundraiser.views > 0
      ? (surveyStarts / fundraiser.views) * 100
      : 0;

  return (
    <main className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto py-12 px-6">

        <div className="flex justify-between items-center">

          <div>

            <h1 className="text-5xl font-bold text-purple-700">
              Founder Analytics
            </h1>

            <p className="text-gray-600 mt-2">
              Live launch metrics
            </p>

          </div>

          <Link
            href="/founder"
            className="bg-purple-600 text-white px-6 py-3 rounded-xl font-bold"
          >
            ← Dashboard
          </Link>

        </div>

        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Views</p>
            <h2 className="text-4xl font-bold">
              {fundraiser.views}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Survey Starts</p>
            <h2 className="text-4xl font-bold text-blue-600">
              {surveyStarts}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Completed</p>
            <h2 className="text-4xl font-bold text-green-600">
              {surveyCompleted}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Revenue</p>
            <h2 className="text-4xl font-bold text-purple-700">
              ${totalRevenue.toFixed(2)}
            </h2>
          </div>

        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg">
              View → Survey Rate
            </h3>

            <div className="text-5xl font-bold mt-4">
              {clickRate.toFixed(1)}%
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg">
              Survey Completion Rate
            </h3>

            <div className="text-5xl font-bold mt-4">
              {completionRate.toFixed(1)}%
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-bold text-lg">
              Average CPX Reward
            </h3>

            <div className="text-5xl font-bold mt-4">
              ${averageReward.toFixed(2)}
            </div>
          </div>

        </div>

        <div className="bg-white rounded-3xl shadow-xl mt-10 p-8">

          <h2 className="text-3xl font-bold mb-6">
            Recent Survey Completions
          </h2>

          {completions.length === 0 ? (

            <p className="text-gray-500">
              No completed surveys yet.
            </p>

          ) : (

            <div className="space-y-4">

              {completions.map((completion) => (

                <div
                  key={completion.id}
                  className="flex justify-between bg-purple-50 rounded-xl p-5"
                >

                  <div>

                    <div className="font-bold">
                      CPX Research Survey
                    </div>

                    <div className="text-sm text-gray-500">
                      {completion.completedAt
                        ?.toLocaleString()}
                    </div>

                  </div>

                  <div className="font-bold text-green-600">
                    +${completion.rewardAmount.toFixed(2)}
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </main>
  );
}
