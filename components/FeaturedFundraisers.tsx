"use client";

import { useEffect, useState } from "react";

type Fundraiser = {
  id: string;
  title: string;
  story: string;
  slug: string;
  goalAmount: number;
  amountRaised: number;
};

export default function FeaturedFundraisers() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/fundraiser");
        const data = await res.json();
        setFundraisers(data);
      } catch (err) {
        console.error("Failed to load fundraisers", err);
      }
    }

    load();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Featured Fundraisers</h2>

      {fundraisers.length === 0 ? (
        <p>No fundraisers yet.</p>
      ) : (
        <div className="grid gap-4">
          {fundraisers.map((f) => (
            <div key={f.id} className="border p-4 rounded">
              <h3 className="font-semibold">{f.title}</h3>
              <p className="text-sm opacity-70">{f.story}</p>
              <p className="text-sm mt-2">
                Raised: ${f.amountRaised} / ${f.goalAmount}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
