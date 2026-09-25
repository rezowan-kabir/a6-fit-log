"use client";

import Image from "next/image";
import { usePlan } from "@/context/PlanContext";
import type { Iworkout } from "@/types/index";

export default function WorkoutDetailsClient({ workout }: { workout: Iworkout }) {
  const { addToPlan, addToSaved } = usePlan();

  return (
    <main className="container mx-auto min-h-screen bg-[#0e0f12] text-white py-10 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 relative w-full h-112.5 sm:h-130 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
            <Image
              src={workout.image}
              alt={workout.name}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover"
              priority
              unoptimized
            />
          </div>

          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-(family-name:--font-bebas) tracking-wider uppercase text-white mb-2">
                {workout.name}
              </h1>

              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {workout.description ||
                  "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {workout.muscleGroups?.map((muscle, idx) => (
                  <span
                    key={idx}
                    className="bg-[#a3e635] text-black text-[11px] font-bold uppercase px-3 py-1 rounded-full tracking-wide"
                  >
                    {muscle}
                  </span>
                ))}
              </div>

              <div className="bg-[#13151b]/80 border border-gray-800/80 rounded-xl divide-y divide-gray-800/60 mb-8 text-xs sm:text-sm">
                {[
                  ["Equipment", workout.equipment],
                  ["Difficulty", workout.difficulty || "Intermediate"],
                  ["Sets", workout.sets || 4],
                  ["Reps", workout.reps || "6-8"],
                  ["Duration", `${workout.duration} min`],
                  ["Calories", `${workout.caloriesBurned} kcal`],
                  ["Rating", workout.rating],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between items-center px-4 py-3">
                    <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">
                      {label}
                    </span>
                    <span className="text-white font-medium">{value}</span>
                  </div>
                ))}
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-3">
                  Instructions
                </h3>
                <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {workout.instructions?.length ? (
                    workout.instructions.map((step, idx) => <li key={idx}>{step}</li>)
                  ) : (
                    <>
                      <li>Lie on the bench with eyes under the bar and feet planted.</li>
                      <li>Unrack with locked elbows and lower the bar to mid-chest.</li>
                      <li>Press up in a slight arc until elbows lock without bouncing.</li>
                      <li>Keep shoulder blades pinched and a natural arch in the back.</li>
                    </>
                  )}
                </ol>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => addToPlan(workout)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#a3e635] text-black font-bold text-xs sm:text-sm uppercase py-3 px-6 rounded-xl hover:bg-[#8ece28] active:scale-[0.98] transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m-7-7h14" />
                  </svg>
                  Add to today&apos;s plan
                </button>

                <button
                  onClick={() => addToSaved(workout)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-gray-800 bg-[#13151b] text-gray-300 font-bold text-xs sm:text-sm uppercase py-3 px-6 rounded-xl hover:border-gray-700 hover:text-white active:scale-[0.98] transition-all cursor-pointer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  Save for later
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
