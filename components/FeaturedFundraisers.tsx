"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fundraiser = {
  id: string;
  title: string;
  story: string;
  slug: string;
  goalAmount: number;
  amountRaised: number;
};

type Status = "loading" | "ready" | "error";

const money = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD" });

export default function FeaturedFundraisers() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);

    async function load() {
      try {
        const res = await fetch("/api/fundraiser", {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        setFundraisers(Array.isArray(data) ? data : []);
        setStatus("ready");
      } catch (error) {
        // eslint-disable-next-line no-console
        console.warn("Failed to load fundraisers", error);
        setStatus("error");
      } finally {
        clearTimeout(timeout);
      }
    }

    load();

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-8 py-20">
      <h2 className="text-4xl font-bold text-center text-purple-700">
        Featured Fundraisers
      </h2>

      {status === "loading" && (
        <div
          className="grid md:grid-cols-3 gap-8 mt-12"
          role="status"
          aria-label="Loading fundraisers"
        >
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-64 animate-pulse rounded-2xl bg-purple-50"
            />
          ))}
        </div>
      )}

      {status === "error" && (
        <p className="text-center mt-10 text-gray-600">
          We couldn&apos;t load fundraisers right now.{" "}
          <Link href="/fundraisers" className="text-purple-700 underline">
            Try the fundraisers page
          </Link>
          .
        </p>
      )}

      {status === "ready" && fundraisers.length === 0 && (
        <p className="text-center mt-10 text-gray-600">
          Campaigns are launching soon. Check back shortly.
        </p>
      )}

      {status === "ready" && fundraisers.length > 0 && (
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {fundraisers.map((fundraiser) => {
            const percent =
              fundraiser.goalAmount > 0
                ? Math.min(
                    100,
                    (fundraiser.amountRaised / fundraiser.goalAmount) * 100
                  )
                : 0;

            return (
              <div
                key={fundraiser.id}
                className="flex flex-col bg-white rounded-2xl shadow-lg p-6"
              >
                <h3 className="text-2xl font-bold text-purple-700">
                  {fundraiser.title}
                </h3>

                <p className="mt-3 text-gray-600 line-clamp-2">
                  {fundraiser.story}
                </p>

                <div className="mt-auto pt-5">
                  <div
                    className="w-full bg-gray-200 h-3 rounded-full"
                    role="progressbar"
                    aria-valuenow={Math.round(percent)}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Fundraising progress"
                  >
                    <div
                      className="bg-purple-600 h-3 rounded-full"
                      style={{ width: `${Math.max(percent, percent > 0 ? 2 : 0)}%` }}
                    />
                  </div>

                  <p className="mt-3 text-sm text-gray-600">
                    <span className="font-bold text-gray-900">
                      {money(fundraiser.amountRaised)}
                    </span>{" "}
                    raised of {money(fundraiser.goalAmount)}
                  </p>

                  <Link
                    href={`/f/${fundraiser.slug}`}
                    className="block mt-5 text-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl"
                  >
                    Support This Fundraiser
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
