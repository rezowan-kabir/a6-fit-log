"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const Navbar = () => {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  const links = (
    <>
      <li>
        <Link
          href="/"
          className={`px-5 py-2 rounded-full font-medium transition-colors ${
            pathname === "/" || pathname.startsWith("/workouts")
              ? "bg-[#1f2b10] text-[#a3e635]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          Workouts
        </Link>
      </li>
      <li>
        <Link
          href="/my-plan"
          className={`px-5 py-2 rounded-full font-medium transition-colors ${
            pathname === "/my-plan"
              ? "bg-[#1f2b10] text-[#a3e635]"
              : "text-gray-400 hover:text-white"
          }`}
        >
          My Plan
        </Link>
      </li>
    </>
  );

  return (
    <header className="bg-[#0e0f12] border-b border-gray-900 sticky top-0 z-50">
      <div className="container mx-auto navbar text-white px-4 md:px-8 py-3">
        <div className="navbar-start flex items-center gap-2">
          <div className="dropdown lg:hidden">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost text-white pl-0 pr-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-[#17181c] rounded-box z-1 mt-3 w-52 p-2 shadow-lg text-white"
            >
              {links}
            </ul>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-2xl font-(family-name:--font-bebas) tracking-wider text-white"
          >
            <svg
              className="w-6 h-6 text-[#a3e635] fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M20.57 14.86L22 13.43L20.57 12L17 15.57L8.43 7L12 3.43L10.57 2L9.14 3.43L7.71 2L5.57 4.14L4.14 2.71L2.71 4.14L4.14 5.57L2 7.71L3.43 9.14L2 10.57L3.43 12L7 8.43L15.57 17L12 20.57L13.43 22L14.86 20.57L16.29 22L18.43 19.86L19.86 21.29L21.29 19.86L19.86 18.43L22 16.29L20.57 14.86Z" />
            </svg>
            <span className="text-2xl pt-1">FITLOG</span>
          </Link>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-2">{links}</ul>
        </div>

        <div className="navbar-end flex items-center gap-4">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>Plan</span>
            <span className="w-5 h-5 flex items-center justify-center bg-[#a3e635] text-black text-xs font-bold rounded-full">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
          >
            <span>Saved</span>
            <span className="w-5 h-5 flex items-center justify-center border border-gray-600 text-gray-300 text-xs font-bold rounded-full">
              {saved.length}
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
