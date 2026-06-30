"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Fundraiser = {
  id: string;
  title: string;
  causeType: string;
  currentImpact: number;
  cpxSessionsCompleted: number;
};

export default function DashboardPage() {
  const [fundraisers, setFundraisers] = useState<Fundraiser[]>([]);

  useEffect(() => {
    async function loadFundraisers() {
      const res = await fetch("/api/fundraiser");
      const data = await res.json();
      setFundraisers(data);
    }

    loadFundraisers();
  }, []);

  const totalImpact = fundraisers.reduce(
    (sum, f) => sum + (f.currentImpact || 0),
    0
  );

  const totalSurveys = fundraisers.reduce(
    (sum, f) => sum + (f.cpxSessionsCompleted || 0),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 flex">

      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 hidden md:block">

        <h1 className="text-2xl font-bold text-purple-700">
          Pollacle
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Powered by CPX Research survey technology
        </p>

        <nav className="mt-10 space-y-4">

          <Link href="/dashboard" className="block text-purple-700 font-semibold">
            Dashboard
          </Link>

          <Link href="/fundraiser/new" className="block text-gray-600 hover:text-purple-700">
            Create Fundraiser
          </Link>

          <Link
            href="/survey"
            className="block text-gray-600 hover:text-purple-700"
          >
            Start Survey
          </Link>

        </nav>

      </aside>

      {/* Main Content */}
      <section className="flex-1 p-8">

        {/* Header */}
        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-3xl font-bold text-gray-900">
              Dashboard
            </h2>

            <p className="text-gray-500">
              Your CPX-powered fundraising activity
            </p>
          </div>

          <Link
            href="/survey"
            className="bg-purple-700 text-white px-4 py-2 rounded-xl hover:bg-purple-800"
          >
            Start Survey
          </Link>

        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white p-6 rounded-2xl border">
            <p className="text-gray-500 text-sm">Fundraisers</p>
            <p className="text-3xl font-bold text-purple-700">
              {fundraisers.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <p className="text-gray-500 text-sm">Total Impact</p>
            <p className="text-3xl font-bold text-purple-700">
              {totalImpact}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border">
            <p className="text-gray-500 text-sm">Surveys Completed</p>
            <p className="text-3xl font-bold text-purple-700">
              {totalSurveys}
            </p>
          </div>

        </div>

        {/* Fundraisers */}
        <div className="mt-10 bg-white p-6 rounded-2xl border">

          <h3 className="text-xl font-bold text-purple-700">
            Your Fundraisers
          </h3>

          {fundraisers.length === 0 ? (
            <p className="text-gray-500 mt-4">
              No fundraisers yet. Create one to start generating impact.
            </p>
          ) : (
            <div className="mt-4 space-y-3">

              {fundraisers.map((f) => (
                <div
                  key={f.id}
                  className="border rounded-xl p-4 flex justify-between items-center"
                >

                  <div>
                    <p className="font-semibold">{f.title}</p>
                    <p className="text-sm text-gray-500">
                      {f.causeType}
                    </p>
                  </div>

                  <div className="text-purple-700 font-bold">
                    {f.currentImpact} impact
                  </div>

                </div>
              ))}

            </div>
          )}

        </div>

      </section>

    </main>
  );
}