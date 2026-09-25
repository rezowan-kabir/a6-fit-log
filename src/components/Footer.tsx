import Link from "next/link";
const Footer = () => {
  return (
    <footer className="container mx-auto bg-[#0e0f12] text-gray-400 py-6 px-4 md:px-8 border-t border-gray-900 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-2xl font-(family-name:--font-bebas) tracking-wider text-white"
        > 
          <svg
            className="w-6 h-6 text-[#a3e635] fill-current"
            viewBox="0 0 24 24"
          >
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
