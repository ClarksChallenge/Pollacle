import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/app/lib/prisma";
import { notFound } from "next/navigation";
import ShareButton from "@/components/ShareButton";
import OfferWallButton from "@/components/OfferWallButton";

export async function generateMetadata({
  params,
}: {
  params: {
    slug: string;
  };
}): Promise<Metadata> {
  const fundraiser = await prisma.fundraiser.findUnique({
    where: {
      slug: params.slug,
    },
  });

  if (!fundraiser) {
    return {
      title: "Pollacle Fundraiser",
      description:
        "Support fundraisers by completing surveys instead of donating.",
    };
  }

  return {
    title: `${fundraiser.title} | Pollacle`,
    description: fundraiser.story,

    openGraph: {
      title: fundraiser.title,
      description: fundraiser.story,

      images: [
        {
          url: `/f/${fundraiser.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: fundraiser.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: fundraiser.title,
      description: fundraiser.story,

      images: [`/f/${fundraiser.slug}/opengraph-image`],
    },
  };
}

export default async function FundraiserPage({
  params,
}: {
  params: {
    slug: string;
  };
}) {
  const fundraiser = await prisma.fundraiser.findUnique({
    where: {
      slug: params.slug,
    },

    include: {
      surveyCompletions: {
        orderBy: {
          completedAt: "desc",
        },

        take: 5,
      },
    },
  });

  if (!fundraiser) {
    notFound();
  }

  const percent =
    fundraiser.goalAmount > 0
      ? Math.min(
          100,
          (fundraiser.amountRaised / fundraiser.goalAmount) * 100
        )
      : 0;

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-xl font-bold text-purple-700"
          >
            🐙 Pollacle
          </Link>

          <Link
            href="/fundraisers"
            className="text-purple-700 font-semibold"
          >
            Browse Fundraisers
          </Link>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-purple-700 text-white p-10">
            <span className="inline-block bg-white/20 px-4 py-1 rounded-full text-sm">
              {fundraiser.category}
            </span>

            <h1 className="text-5xl font-extrabold mt-5">
              {fundraiser.title}
            </h1>

            <p className="mt-5 text-lg text-purple-100">
              {fundraiser.story}
            </p>
          </div>

          <div className="p-8">
            <div className="flex justify-between font-bold text-lg">
              <span>${fundraiser.amountRaised.toFixed(2)} raised</span>

              <span>Goal ${fundraiser.goalAmount.toFixed(2)}</span>
            </div>

            <div className="mt-4 h-5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-600"
                style={{
                  width: `${percent}%`,
                }}
              />
            </div>

            <p className="mt-3 text-gray-500">
              {percent.toFixed(0)}% funded
            </p>
          </div>

          <div className="px-8 pb-8">
            <div className="bg-purple-50 rounded-2xl p-8 text-center">
              <Image
                src="/pollacle.png"
                alt="Pollacle mascot"
                width={150}
                height={150}
                className="mx-auto"
              />

              <h2 className="text-3xl font-bold text-purple-700 mt-4">
                Support this fundraiser without donating
              </h2>

              <p className="mt-3 text-gray-600 max-w-xl mx-auto">
                Complete surveys from trusted research partners.
                Pollacle rewards are automatically credited toward this fundraiser.
              </p>

              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
                <OfferWallButton slug={fundraiser.slug} title={fundraiser.title} />

                <ShareButton title={fundraiser.title} />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-5 px-8 pb-8">
            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-purple-700">
                {fundraiser.surveySupporters}
              </div>
              <p className="text-gray-500">Supporters</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-green-600">
                ${fundraiser.amountRaised.toFixed(2)}
              </div>
              <p className="text-gray-500">Raised</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 text-center">
              <div className="text-3xl font-bold text-purple-700">
                {fundraiser.surveyCompletions.length}
              </div>
              <p className="text-gray-500">Recent Surveys</p>
            </div>
          </div>

          <div className="border-t p-8">
            <h2 className="text-2xl font-bold mb-5">Recent Support Activity</h2>

            {fundraiser.surveyCompletions.length === 0 ? (
              <p className="text-gray-500">Be the first supporter!</p>
            ) : (
              <div className="space-y-4">
                {fundraiser.surveyCompletions.map((item) => (
                  <div
                    key={item.id}
                    className="bg-purple-50 rounded-xl p-5 flex justify-between"
                  >
                    <span>🐙 Survey completed</span>

                    <strong className="text-green-600">
                      +${item.rewardAmount.toFixed(2)}
                    </strong>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-t p-8 text-center text-gray-500">
            <p>
              Pollacle helps communities raise support through survey participation.
            </p>

            <p className="mt-2">
              Survey rewards, not donations, fund campaigns.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
