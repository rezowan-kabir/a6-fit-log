"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";
import { getWorkoutById } from "@/utils/api";
import { Iworkout } from "@/types/index";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function WorkoutDetails({ params }: PageProps) {
  // Next.js 15 / React 19 compliant unwrapping
  const { id } = use(params);

  const { plan, addToPlan, addToSaved } = usePlan();
  const [workout, setWorkout] = useState<Iworkout | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadWorkout() {
      try {
        const data = await getWorkoutById(id);
        setWorkout(data);
      } catch (error) {
        console.error("Failed to load workout:", error);
      } 
      finally {
        setLoading(false);
      }
    }
    loadWorkout();
  }, [id]);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0f12] text-white flex items-center justify-center">
        <div className="animate-pulse text-gray-400">Loading workout...</div>
      </div>
    );
  }

  // Not Found UI
  if (!workout) {
    return (
      <div className="min-h-screen bg-[#0e0f12] text-white flex flex-col items-center justify-center gap-4">
        <div className="text-xl text-red-400 font-semibold">Workout not found!</div>
        <Link href="/" className="text-sm text-[#a3e635] underline">
          Back to Library
        </Link>
      </div>
    );
  }

  const isPlanFull = plan.length >= 5;
  const isAlreadyInPlan = plan.some((item) => item.id === workout.id);

  return (
    <main className=" container mx-auto min-h-screen bg-[#0e0f12] text-white py-10 px-4 md:px-8 flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#a3e635] transition-colors duration-200 mb-6"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span>Back to Library</span>
        </Link>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image */}
          <div className="lg:col-span-5 relative w-full h-[450px] sm:h-[520px] rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
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

          {/* Right Column: Exercise Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div>
              {/* Header Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-[family-name:var(--font-bebas)] tracking-wider uppercase text-white mb-2">
                {workout.name}
              </h1>

              {/* Subtitle / Description */}
              <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                {workout.description ||
                  "A compound press that builds chest thickness, triceps, and pressing power from a stable bench."}
              </p>

              {/* Muscle Groups Badges */}
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

              {/* Information Table / Specifications */}
              <div className="bg-[#13151b]/80 border border-gray-800/80 rounded-xl divide-y divide-gray-800/60 mb-8 text-xs sm:text-sm">
                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Equipment</span>
                  <span className="text-white font-medium">{workout.equipment}</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Difficulty</span>
                  <span className="text-white font-medium">{workout.difficulty || "Intermediate"}</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Sets</span>
                  <span className="text-white font-medium">{workout.sets || 4}</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Reps</span>
                  <span className="text-white font-medium">{workout.reps || "6-8"}</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Duration</span>
                  <span className="text-white font-medium">{workout.duration} min</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Calories</span>
                  <span className="text-white font-medium">{workout.caloriesBurned} kcal</span>
                </div>

                <div className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-400 uppercase tracking-wider text-[11px] font-medium">Rating</span>
                  <span className="text-white font-medium">{workout.rating}</span>
                </div>
              </div>

              {/* Instructions Section */}
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

              {/* Action Buttons connected to your state/context */}
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => addToPlan(workout)}
                  disabled={isPlanFull || isAlreadyInPlan}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 bg-[#a3e635] text-black font-bold text-xs sm:text-sm uppercase py-3 px-6 rounded-xl hover:bg-[#8ece28] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>
                    {isAlreadyInPlan
                      ? "Already in Plan"
                      : isPlanFull
                      ? "Plan Full (Max 5)"
                      : "Add to today's plan"}
                  </span>
                </button>

                <button
                  onClick={() => addToSaved(workout)}
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 border border-gray-800 bg-[#13151b] text-gray-300 font-bold text-xs sm:text-sm uppercase py-3 px-6 rounded-xl hover:border-gray-700 hover:text-white active:scale-[0.98] transition-all cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                  </svg>
                  <span>Save for later</span>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>
    </main>
  );
}