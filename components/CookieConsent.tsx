"use client";
import { useEffect, useState } from "react";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const accepted = localStorage.getItem('pollacle_cookie_accepted');
      if (!accepted) setVisible(true);
    } catch (e) {
      setVisible(true);
    }
  }, []);

  async function accept() {
    try {
      localStorage.setItem('pollacle_cookie_accepted', '1');
      // send consent to server
      await fetch('/api/consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ purpose: 'cookies', value: true }),
      });
    } catch (e) {
      // ignore
    }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 max-w-3xl mx-auto bg-white border rounded-xl shadow-lg p-4 z-50">
      <div className="flex items-center justify-between gap-4">
        <div>
          <strong className="text-gray-900">We use cookies</strong>
          <div className="text-sm text-gray-600">We use cookies to improve your experience. By continuing you accept our <a className="text-purple-700 underline" href="/privacy">Privacy Policy</a>.</div>
        </div>
        <div>
          <button onClick={accept} className="bg-purple-700 text-white px-4 py-2 rounded-lg">Accept</button>
        </div>
      </div>
    </div>
  );
}
