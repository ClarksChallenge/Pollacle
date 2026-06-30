"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Fundraiser = {
  id: string;
  title: string;
  causeType: string;
};

export default function SurveyPage() {
  const router = useRouter();
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/fundraiser");
      const data = await res.json();
      setFundraisers(data);
    }
    load();
  }, []);

  const startSurvey = async () => {
    if (!selected) return alert("Pick a fundraiser first");

    await fetch("/api/survey/complete", {
      method: "POST",
      body: JSON.stringify({ fundraiserId: selected }),
    });

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen p-10 bg-gray-50">

      <h1 className="text-3xl font-bold text-purple-700">
        CPX Survey
      </h1>

      <p className="text-gray-500 mt-2">
        Choose a fundraiser to support
      </p>

      <div className="mt-6 space-y-3">
        {fundraisers.map((f) => (
          <div
            key={f.id}
            onClick={() => setSelected(f.id)}
            className={`p-4 border rounded-xl cursor-pointer ${
              selected === f.id ? "border-purple-700 bg-purple-50" : ""
            }`}
          >
            <p className="font-semibold">{f.title}</p>
            <p className="text-sm text-gray-500">{f.causeType}</p>
          </div>
        ))}
      </div>

      <button
        onClick={startSurvey}
        className="mt-6 bg-purple-700 text-white px-6 py-3 rounded-xl"
      >
        Complete Survey
      </button>

    </main>
  );
}