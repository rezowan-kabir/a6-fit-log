import React from "react";

export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0e0f12] flex flex-col items-center justify-center gap-3">
      <span className="loading loading-spinner loading-lg text-[#a3e635]"></span>
      <p className="text-xs uppercase tracking-widest text-gray-400 animate-pulse font-mono">
        Loading...
      </p>
    </div>
  );
}
