import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="container mx-auto bg-[#0e0f12] text-gray-400 py-6 px-4 md:px-8 border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-[family-name:var(--font-bebas)] tracking-wider text-white"
        >
          <svg
            className="w-6 h-6 text-[#a3e635] fill-current"
            viewBox="0 0 24 24"
          >
            <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" />
          </svg>
          <span className="text-2xl pt-1">FITLOG</span>
        </Link>

        <p className="text-xs md:text-sm text-gray-400 text-center md:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
