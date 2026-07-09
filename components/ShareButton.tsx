"use client";

import { useState } from "react";

export default function ShareButton({
  title,
}: {
  title: string;
}) {

  const [copied, setCopied] = useState(false);


  async function share() {

    const url = window.location.href;


    if (navigator.share) {

      try {

        await navigator.share({

          title: title,

          text: `Help support ${title} on Pollacle`,

          url: url,

        });

      } catch {

      }

      return;

    }



    await navigator.clipboard.writeText(url);

    setCopied(true);


    setTimeout(() => {

      setCopied(false);

    }, 2000);

  }



  return (

    <button

      onClick={share}

      className="border border-purple-600 text-purple-700 hover:bg-purple-50 px-6 py-3 rounded-xl font-semibold transition"

    >

      {copied
        ? "✓ Link Copied!"
        : "🔗 Share Fundraiser"}

    </button>

  );

}
