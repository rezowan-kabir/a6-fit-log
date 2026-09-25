import Image from "next/image";
import Link from "next/link";
import type { Iworkout } from "@/types/index";

const WorkoutCard = ({ item }: { item: Iworkout }) => {
  return (
    <Link
      href={`/workouts/${item.id}`}
      className="group bg-[#13151b] border border-gray-800/80 rounded-2xl overflow-hidden hover:border-[#a3e635]/50 hover:shadow-lg hover:shadow-[#a3e635]/10 hover:-translate-y-1 active:scale-[0.98] transition-all duration-300 flex flex-col justify-between cursor-pointer"
    >
      {/* Card Top: Image Component */}
      <div className="relative w-full h-52 bg-gray-900">
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          unoptimized
        />
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Muscle Group Badges */}
          <div className="flex flex-wrap gap-2 mb-3">
            {item.muscleGroups?.map((muscle: string, idx: number) => (
              <span
                key={idx}
                className="bg-[#a3e635] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide"
              >
                {muscle}
              </span>
            ))}
          </div>

          <h3 className="text-xl font-(family-name:--font-bebas) tracking-wide uppercase text-white group-hover:text-[#a3e635] transition-colors duration-300 mb-1">
            {item.name}
          </h3>

          {/* Equipment */}
          <p className="text-xs text-gray-400 mb-6">{item.equipment}</p>
        </div>

        {/* Card Bottom Info */}
        <div className="pt-4 border-t border-gray-800/60 flex items-center justify-between text-xs text-gray-400">
          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{item.duration} min</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
            <span>{item.caloriesBurned} kcal</span>
          </div>

          <div className="flex items-center gap-1.5">
            <svg
              className="w-4 h-4 text-yellow-500 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{item.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default WorkoutCard;
