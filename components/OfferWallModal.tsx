"use client";

import { useEffect, useState } from "react";

interface OfferWallModalProps {
  slug: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function OfferWallModal({
  slug,
  title,
  isOpen,
  onClose,
}: OfferWallModalProps) {
  const [sessionId, setSessionId] = useState<string>("");
  const [cpxLoaded, setCpxLoaded] = useState(false);

  // Generate unique session ID
  useEffect(() => {
    if (!isOpen) return;

    let id = sessionStorage.getItem("cpx_session_id");
    if (!id) {
      id = `pollacle_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("cpx_session_id", id);
    }
    setSessionId(id);
  }, [isOpen]);

  // Load CPX offer wall
  useEffect(() => {
    if (!isOpen || !sessionId) return;

    const script = document.createElement("script");
    script.src = "https://static.cpx-research.com/js/c/p/s.js";
    script.async = true;
    script.onload = () => {
      setCpxLoaded(true);
      if (window.cpx) {
        window.cpx.displayOfferwall({
          userId: sessionId,
          custom: slug,
        });
      }
    };
    script.onerror = () => {
      console.error("Failed to load CPX script");
      setCpxLoaded(true);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isOpen, sessionId, slug]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-purple-700">Complete Surveys</h2>
            <p className="text-gray-600 mt-1">Support: {title}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!cpxLoaded && (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="animate-spin mb-4">
                <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full"></div>
              </div>
              <p className="text-gray-500 font-semibold">Loading surveys...</p>
              <p className="text-gray-400 text-sm mt-2">
                If surveys don't load, check your ad blocker or try a different browser.
              </p>
            </div>
          )}
          <div id="cpx_offerwall" />
        </div>

        {/* Footer Info */}
        <div className="border-t bg-gray-50 p-6">
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              <span className="font-semibold text-purple-700">💡 Pro Tip:</span> Complete
              surveys honestly for better rewards
            </p>
            <p>
              <span className="font-semibold text-purple-700">⏱️ Takes 5-20 min:</span> Most
              surveys are quick to complete
            </p>
            <p>
              <span className="font-semibold text-purple-700">✅ Instant rewards:</span> Your
              earnings go directly to {title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

declare global {
  interface Window {
    cpx?: {
      displayOfferwall: (config: { userId: string; custom: string }) => void;
    };
  }
}
