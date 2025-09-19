import React from "react";

const LoadingGlass: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 100"
        className="w-40 h-20 animate-spin-slow"
      >
        {/* Left Lens */}
        <circle
          cx="60"
          cy="50"
          r="30"
          stroke="#6366f1"  // Indigo-500
          strokeWidth="6"
          fill="none"
        />
        {/* Right Lens */}
        <circle
          cx="140"
          cy="50"
          r="30"
          stroke="#6366f1"
          strokeWidth="6"
          fill="none"
        />
        {/* Bridge */}
        <rect
          x="90"
          y="47"
          width="20"
          height="6"
          rx="3"
          fill="#6366f1"
        />
        {/* Sparkle Pulse inside Left Lens */}
        <circle
          cx="60"
          cy="50"
          r="10"
          stroke="#a5b4fc"  // Indigo-300
          strokeWidth="3"
          fill="none"
          className="animate-ping"
        />
        {/* Sparkle Pulse inside Right Lens */}
        <circle
          cx="140"
          cy="50"
          r="10"
          stroke="#a5b4fc"
          strokeWidth="3"
          fill="none"
          className="animate-ping"
        />
      </svg>
    </div>
  );
};

export default LoadingGlass;
