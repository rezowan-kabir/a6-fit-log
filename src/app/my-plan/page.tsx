"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePlan } from "@/context/PlanContext";

type SortBy = "duration" | "calories" | "rating";

export default function MyPlanPage() {
  const {
    plan,
    saved,
    completedIds,
    removeFromPlan,
    removeFromSaved,
    toggleComplete,
  } = usePlan();

  // Tab State 
  const [activeTab, setActiveTab] = useState<"plan" | "saved">("plan");

  // Sort State
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  
  const currentRawList = activeTab === "plan" ? plan : saved;

 
  const totalExercises = currentRawList.length;
  const totalMinutes = currentRawList.reduce(
    (acc, curr) => acc + (Number(curr.duration) || 0),
    0,
  );
  const totalCalories = currentRawList.reduce(
    (acc, curr) => acc + (Number(curr.caloriesBurned) || 0),
    0,
  );

  
  const currentList = [...currentRawList].sort((a, b) => {
    if (sortBy === "duration") return (b.duration || 0) - (a.duration || 0);
    if (sortBy === "calories")
      return (b.caloriesBurned || 0) - (a.caloriesBurned || 0);
    if (sortBy === "rating") return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <main className="min-h-screen bg-[#0e0f12] text-white py-10 px-4 md:px-12">
      <div className="max-w-6xl mx-auto">
     
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-(family-name:--font-bebas) tracking-wider uppercase">
            MY PLAN
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Dynamic Top Stats Bar */}
        <div className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-6 grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col">
            <span className="text-xs text-gray-400 font-medium mb-1">
              Exercises
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-[#a3e635]">
              {totalExercises}
            </span>
          </div>
          <div className="flex flex-col border-x border-gray-800/60 px-4 sm:px-8">
            <span className="text-xs text-gray-400 font-medium mb-1">
              Minutes
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {totalMinutes}
            </span>
          </div>
          <div className="flex flex-col pl-2 sm:pl-4">
            <span className="text-xs text-gray-400 font-medium mb-1">
              Calories
            </span>
            <span className="text-3xl sm:text-4xl font-bold text-white">
              {totalCalories}
            </span>
          </div>
        </div>

        
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="bg-[#13151b] p-1 rounded-xl border border-gray-800/80 inline-flex">
            <button
              onClick={() => setActiveTab("plan")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "plan"
                  ? "bg-[#1f222d] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Today&apos;s Plan ({plan.length})
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === "saved"
                  ? "bg-[#1f222d] text-white shadow-sm"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Saved ({saved.length})
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Sort By</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortBy)}
              className="select select-sm bg-[#13151b] border border-gray-800 text-white text-xs rounded-xl focus:border-[#a3e635] focus:outline-none"
            >
              <option value="duration">Duration</option>
              <option value="calories">Calories</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

       
        {currentList.length === 0 ? (
          
          <div className="border border-dashed border-gray-800 rounded-2xl p-16 flex flex-col items-center justify-center text-center my-8">
            <h3 className="text-xl sm:text-2xl font-(family-name:--font-bebas) tracking-wider text-white mb-2">
              NOTHING HERE YET
            </h3>
            <p className="text-xs text-gray-400 mb-6">
              {activeTab === "plan"
                ? "Browse the library and add a lift to get today moving."
                : "You haven't saved any workouts for later yet."}
            </p>
            <Link
              href="/"
              className="bg-[#a3e635] text-black font-bold text-xs uppercase px-6 py-3 rounded-xl hover:bg-[#8dca28] transition-colors shadow-lg shadow-[#a3e635]/10"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          
          <div className="space-y-4">
            {currentList.map((item) => {
              const isCompleted = completedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  className="bg-[#13151b] border border-gray-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-700/80 transition-colors"
                >
                  
                  <div className="flex items-center gap-4">
                    <div className="relative w-28 h-18 sm:w-36 sm:h-20 rounded-xl overflow-hidden bg-gray-900 shrink-0 border border-gray-800">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>

                    <div>
                      <h4 className="text-lg font-(family-name:--font-bebas) tracking-wide uppercase text-white">
                        {item.name}
                      </h4>
                      <p className="text-xs text-gray-400 mb-2">
                        {item.equipment}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-gray-400">
                        <span className="flex items-center gap-1">
                          ⏱ {item.duration} min
                        </span>
                        <span className="flex items-center gap-1">
                          🔥 {item.caloriesBurned} kcal
                        </span>
                        <span className="flex items-center gap-1 text-yellow-500">
                          ★ {item.rating}
                        </span>
                      </div>
                    </div>
                  </div>

                 
                  <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                    <Link
                      href={`/workouts/${item.id}`}
                      className="px-4 py-2 border border-gray-800 rounded-xl text-xs font-bold text-gray-300 hover:text-white hover:border-gray-700 bg-[#0e0f12]/50 transition-colors"
                    >
                      View Details
                    </Link>

                    {activeTab === "plan" && (
                      <button
                        onClick={() => toggleComplete(item.id)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold uppercase flex items-center gap-1.5 transition-all cursor-pointer ${
                          isCompleted
                            ? "bg-gray-800 text-gray-400"
                            : "bg-[#a3e635] text-black hover:bg-[#8ece28]"
                        }`}
                      >
                        ✓ {isCompleted ? "Completed" : "Mark as Done"}
                      </button>
                    )}

                    <button
                      onClick={() =>
                        activeTab === "plan"
                          ? removeFromPlan(item.id)
                          : removeFromSaved(item.id)
                      }
                      className="text-gray-500 hover:text-red-400 p-2 transition-colors cursor-pointer"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
