"use client";

import { useState } from "react";
import OfferWallModal from "./OfferWallModal";

interface OfferWallButtonProps {
  slug: string;
  title: string;
}

export default function OfferWallButton({
  slug,
  title,
}: OfferWallButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-purple-700 hover:bg-purple-800 text-white text-xl font-bold px-10 py-5 rounded-2xl transition"
      >
        Support With Surveys →
      </button>

      <OfferWallModal
        slug={slug}
        title={title}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
