'use client';

import { useState } from 'react';

interface SupportButtonProps {
  fundraiserSlug: string; // Changed from ID to Slug to match your API requirements
}

export default function SupportButton({ fundraiserSlug }: SupportButtonProps) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSupportClick = async () => {
    if (!agreed) {
      setError('You must confirm your age to support this campaign.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      // Send a secure POST request carrying the JSON body payload your API expects
      const response = await fetch('/api/survey/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fundraiserSlug: fundraiserSlug,
          referrer: typeof window !== 'undefined' ? window.location.href : 'Direct',
        }),
      });
      
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate a secure survey tracking session.');
      }
      
      // Open the survey URL safely in a new tab
      if (data.surveyUrl) {
        window.open(data.surveyUrl, '_blank', 'noopener,noreferrer');
      } else {
        throw new Error('Server did not return a valid configuration route.');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected connectivity error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white border border-gray-200 rounded-xl shadow-sm space-y-4">
      <h3 className="text-lg font-bold text-gray-900">Support This Campaign</h3>
      
      <p className="text-sm text-gray-600 leading-relaxed">
        By clicking below, you will complete a secure corporate market research survey. 
        You will not receive any rewards. <strong className="text-gray-900">100% of the generated revenue 
        will be credited directly</strong> to this campaign balance.
      </p>

      {/* Mandatory CPX & Privacy Compliance Checkbox */}
      <div className="flex items-start gap-3 mt-2">
        <input
          id="compliance-check"
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          disabled={loading}
          className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500 disabled:opacity-50"
        />
        <label htmlFor="compliance-check" className="text-xs text-gray-500 leading-normal">
          I am <strong className="text-gray-700">18 years of age or older</strong> and agree to share 
          temporary device & demographic data with third-party research networks to generate this credit.
        </label>
      </div>

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

      <button
        onClick={handleSupportClick}
        disabled={!agreed || loading}
        className={`w-full py-3 px-4 font-medium rounded-lg text-white transition-all duration-200 ${
          agreed && !loading
            ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-sm' 
            : 'bg-gray-300 cursor-not-allowed opacity-70'
        }`}
      >
        {loading ? '⏳ Preparing Survey...' : '🚀 Start Survey to Support'}
      </button>
      
    </div>
  );
}
