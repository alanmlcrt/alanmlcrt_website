"use client";

import { useState } from "react";

export default function ShareButton() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button 
      onClick={handleShare}
      title={copied ? "Lien copié !" : "Copier le lien"}
      className={`w-12 h-12 flex items-center justify-center border transition-all duration-300 ${
        copied 
          ? "border-green-500/50 text-green-400 bg-green-500/10" 
          : "border-white/10 hover:border-orange-500/50 hover:text-orange-400"
      }`}
    >
      <span className="material-symbols-outlined text-base">
        {copied ? "check" : "share"}
      </span>
    </button>
  );
}
