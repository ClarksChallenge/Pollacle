"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function StartSurveyContent() {
  const fundraiser = useSearchParams().get("fundraiser");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!fundraiser) {
      setError("This survey link is missing its fundraiser.");
      return;
    }

    async function startSurvey() {
      try {
        const response = await fetch("/api/survey/start", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ fundraiserSlug: fundraiser }),
        });
        const body = await response.json();
        if (!response.ok || !body.surveyUrl) {
          throw new Error(body.error || "Unable to start a survey right now.");
        }
        window.location.assign(body.surveyUrl);
      } catch (startError) {
        setError(startError instanceof Error ? startError.message : "Unable to start a survey right now.");
      }
    }

    void startSurvey();
  }, [fundraiser]);

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Connecting you to a survey</h1>
        <p className="text-gray-600 mb-8">
          We are securely starting a survey that supports this fundraiser.
        </p>
        {error ? (
          <>
            <p className="rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
            {fundraiser && (
              <Link href={`/f/${fundraiser}`} className="mt-6 inline-block text-purple-700 underline">
                Return to fundraiser
              </Link>
            )}
          </>
        ) : (
          <p className="text-gray-600">Please wait…</p>
        )}
      </div>
    </main>
  );
}
