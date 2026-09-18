"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

declare global {
  interface Window {
    Fidel?: {
      openForm: (options: {
        companyName: string;
        sdkKey: string;
        programId: string;
        metadata?: Record<string, unknown>;
        onCardEnrolledCallback?: (card: FidelCard) => void;
        onCardEnrollFailedCallback?: (error: unknown) => void;
        onUserCancelledCallback?: () => void;
      }) => void;
    };
  }
}

type FidelCard = {
  id?: string;
  programId?: string;
  scheme?: string;
  lastNumbers?: string;
};

export default function FidelCardLink() {
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [message, setMessage] = useState("");

  const sdkKey = process.env.NEXT_PUBLIC_FIDEL_SDK_KEY;
  const programId = process.env.NEXT_PUBLIC_FIDEL_PROGRAM_ID;

  useEffect(() => {
    if (window.Fidel) {
      setSdkLoaded(true);
    }
  }, []);

  function openCardForm() {
    if (!window.Fidel) {
      setMessage("Fidel is still loading. Please try again.");
      return;
    }

    if (!sdkKey || !programId) {
      setMessage("Fidel is not configured correctly.");
      return;
    }

    setMessage("");

    window.Fidel.openForm({
      companyName: "Pollacle",
      sdkKey,
      programId,

      metadata: {
        id: "pollacle-fidel-test",
      },

      onCardEnrolledCallback: (card) => {
        console.log("Fidel card enrolled:", card);
        setMessage("Card linked successfully.");
      },

      onCardEnrollFailedCallback: (error) => {
        console.error("Fidel card enrollment failed:", error);
        setMessage("We couldn't link that card. Please try again.");
      },

      onUserCancelledCallback: () => {
        setMessage("");
      },
    });
  }

  return (
    <div>
      <Script
        id="fidel-web-sdk"
        src="https://resources.fidel.uk/sdk/js/v3/fidel.js"
        strategy="afterInteractive"
        onLoad={() => setSdkLoaded(true)}
      />

      <button
        type="button"
        onClick={openCardForm}
        disabled={!sdkLoaded}
        className="rounded-lg px-5 py-3 font-semibold disabled:cursor-not-allowed disabled:opacity-50"
      >
        {sdkLoaded ? "Link a Card" : "Loading…"}
      </button>

      {message && (
        <p className="mt-3 text-sm" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
