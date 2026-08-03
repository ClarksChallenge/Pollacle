"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function SurveyContent() {
  const params = useSearchParams();
  const router = useRouter();
  const fundraiser = params.get("fundraiser");
  const [consentedToPrivacy, setConsentedToPrivacy] = useState(false);
  const [ageConfirmed, setAgeConfirmed] = useState(false);

  const handleStart = () => {
    if (!fundraiser || !consentedToPrivacy || !ageConfirmed) {
      return;
    }

    router.push(`/survey/start?fundraiser=${encodeURIComponent(fundraiser)}`);
  };

  const displayName = fundraiser || "your selected fundraiser";

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-lg p-10">
        <Image
          src="/pollacle.png"
          alt="Pollacle Mascot"
          width={160}
          height={160}
          className="mx-auto"
        />

        <h1 className="text-4xl font-bold text-center mt-4 mb-6">
          Support With Surveys
        </h1>

        <p className="text-center text-gray-600 text-lg mb-8">
          Complete surveys and help a fundraiser earn rewards. You never have to spend your own money.
        </p>

        <div className="bg-purple-100 rounded-xl p-5 mb-8">
          <h2 className="font-bold text-lg">You&apos;re Supporting</h2>
          <p className="text-purple-700 text-xl font-semibold mt-2">
            {fundraiser || "Unknown Fundraiser"}
          </p>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <p className="font-semibold">Important disclosure</p>
          <p className="mt-2">
            By clicking below, you are completing a corporate market research survey. You will not receive cash or rewards. 100% of the generated ad revenue will be credited directly to {displayName}&apos;s campaign.
          </p>
          <p className="mt-2">You may close this survey window at any time without penalty.</p>
        </div>

        <div className="mt-6 space-y-3 text-left">
          <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={consentedToPrivacy}
              onChange={(event) => setConsentedToPrivacy(event.target.checked)}
              className="mt-1 h-4 w-4 accent-purple-600"
            />
            <span>
              I understand that my demographic and device data may be processed by CPX Research and other research partners for survey qualification, fraud screening, and reward processing.
            </span>
          </label>

          <label className="flex items-start gap-3 rounded-lg border border-gray-200 p-3 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={ageConfirmed}
              onChange={(event) => setAgeConfirmed(event.target.checked)}
              className="mt-1 h-4 w-4 accent-purple-600"
            />
            <span>I confirm that I am at least 14 years old and want to continue to the survey.</span>
          </label>
        </div>

        <div className="border rounded-xl p-6 shadow-sm mt-6">
          <h2 className="text-2xl font-bold">Available Survey</h2>
          <h3 className="text-xl font-semibold mt-4">Consumer Opinion Survey</h3>
          <p className="text-gray-600 mt-2">
            Share your opinions to help companies improve their products and services.
          </p>

          <div className="flex justify-between mt-5">
            <span>Time: 10 minutes</span>
            <span className="font-bold text-green-600">Reward: $1.50</span>
          </div>

          <button
            type="button"
            onClick={handleStart}
            disabled={!consentedToPrivacy || !ageConfirmed}
            className="mt-6 w-full rounded-xl bg-purple-600 py-4 text-center text-xl font-bold text-white transition hover:bg-purple-700 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            Start Survey
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Pollacle is powered by trusted research partners.</p>
          <p className="mt-2">Survey screening and reward amounts are determined by our partners. If a survey is disqualified or cancelled, no credit is generated.</p>
        </div>
      </div>
    </main>
  );
}
