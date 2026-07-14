"use client";

import { useState } from "react";

export default function ShareButton({
  url,
  title,
}: {
  url: string;
  title?: string;
}) {

  const [copied, setCopied] = useState(false);


  async function share() {


    if (navigator.share) {

      try {

        await navigator.share({

          title: title || "Pollacle Fundraiser",

          text: `Support ${title || "this fundraiser"} on Pollacle`,

          url,

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

      className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-xl font-bold"

    >

      {copied
        ? "✓ Copied!"
        : "🔗 Share"}

    </button>

  );

}
