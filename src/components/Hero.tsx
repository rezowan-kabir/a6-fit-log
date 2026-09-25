import Image from "next/image";
import bannerImg from "@/assets/banner.png";
import Link from "next/link";

const Banner = () => {
  return (
    <section className="container mx-auto px-4 md:px-8 py-6">
      <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-7xl mx-auto shadow-2xl">
        <div className="space-y-4">
          <p className="text-[#a3e635] text-xs font-bold  uppercase">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-(family-name:--font-bebas) tracking-wide leading-none text-white ">
            TRAIN WITH INTENT. LOG <br className="hidden md:block" /> EVERY SET.
          </h1>

          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md pt-2">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <Link
            href="#library"
            className="inline-flex items-center gap-2 bg-[#a3e635] hover:bg-[#8ece26] text-black font-extrabold text-xs md:text-sm px-6 py-3.5 rounded-lg active:scale-95"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 13l-7 7-7-7m7 7V4" />
            </svg>
            BROWSE WORKOUTS
          </Link>
        </div>

        <div className="flex justify-center md:justify-end items-center">
          <div className="relative w-full max-w-md h-auto">
            <Image
              src={bannerImg}
              alt="Workout Banner"
              className="w-full h-auto object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
