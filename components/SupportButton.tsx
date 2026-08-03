'use client';

import { useState } from 'react';

interface SupportButtonProps {
  fundraiserId: string; // The ID of the user getting the credit
}

export default function SupportButton({ fundraiserId }: SupportButtonProps) {
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const handleSupportClick = () => {
    if (!agreed) {
      setError('You must confirm your age to support this campaign.');
      return;
    }
    setError('');

    // 1. Core CPX Configuration Parameters
    const appId = "YOUR_CPX_APP_ID"; // Get this from your CPX Dashboard
    const extUserId = encodeURIComponent(fundraiserId); // Pass the target fundraiser's ID
    
    /**
     * 2. Build the CPX Web URL
     * This opens the responsive web view of the survey panel tailored 
     * to this specific fundraiser's tracking pipeline.
     */
    const cpxUrl = `https://cpx-research.com{appId}&ext_user_id=${extUserId}`;

    // 3. Open the survey interface safely in a new tab
    window.open(cpxUrl, '_blank', 'noopener,noreferrer');
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
          className="w-4 h-4 mt-0.5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="compliance-check" className="text-xs text-gray-500 leading-normal">
          I am <strong className="text-gray-700">14 years of age or older</strong> and agree to share 
          temporary device & demographic data with third-party research networks to generate this credit.
        </label>
      </div>

      {error && <p className="text-xs font-semibold text-red-600">{error}</p>}

      <button
        onClick={handleSupportClick}
        className={`w-full py-3 px-4 font-medium rounded-lg text-white transition-all duration-200 ${
          agreed 
            ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer shadow-sm' 
            : 'bg-gray-300 cursor-not-allowed'
        }`}
      >
        🚀 Start Survey to Support
      </button>
      
      <p className="text-[10px] text-center text-gray-400">
        Powered securely by Pollacle x CPX Research. You can exit the survey at any time.
      </p>
    </div>
  );
}
