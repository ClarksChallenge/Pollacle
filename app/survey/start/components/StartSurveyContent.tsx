"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function StartSurveyContent() {
  const fundraiser = useSearchParams().get("fundraiser");
  const [error, setError] = useState<string | null>(null);
  const [consentedToPrivacy, setConsentedToPrivacy] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [isStarting, setIsStarting] = useState(false);

  async function startSurvey() {
    if (!fundraiser) {
      setError("This survey link is missing its fundraiser.");
      return;
    }

    if (!consentedToPrivacy || !ageConfirmed) {
      setError("Please confirm your age and consent before continuing.");
      return;
    }

    setIsStarting(true);

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
      setIsStarting(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-lg p-10 text-center">
        <h1 className="text-4xl font-bold mb-6">Connecting you to a survey</h1>
        <p className="text-gray-600 mb-8">
          We are securely starting a survey that supports this fundraiser.
        </p>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-left text-sm text-amber-900">
          <p className="font-semibold">Before you continue</p>
          <p className="mt-2">You may close this survey window at any time without penalty. If a survey is disqualified or cancelled, no credit will be generated.</p>
        </div>

        <div className="mt-6 space-y-3 text-left">
          <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={consentedToPrivacy}
              onChange={(event) => setConsentedToPrivacy(event.target.checked)}
              className="mt-1 h-4 w-4 accent-purple-600"
            />
            <span>I understand that my demographic and device data may be processed by our research partners.</span>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(event) => setAgeConfirmed(event.target.checked)}
              className="mt-1 h-4 w-4 accent-purple-600"
            />
            <span>I confirm I am at least 18 years old.</span>
          </label>
        </div>

        <button
          type="button"
          onClick={startSurvey}
          disabled={!consentedToPrivacy || !ageConfirmed || isStarting}
          className="mt-6 w-full rounded-xl bg-purple-600 py-4 text-center text-xl font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
        >
          {isStarting ? "Starting…" : "Continue to survey"}
        </button>

        {error ? (
          <>
            <p className="mt-4 rounded-lg bg-red-50 p-4 text-red-700">{error}</p>
            {fundraiser && (
              <Link href={`/f/${fundraiser}`} className="mt-6 inline-block text-purple-700 underline">
                Return to fundraiser
              </Link>
            )}
          </>
        ) : null}
      </div>
    </main>
  );
}
