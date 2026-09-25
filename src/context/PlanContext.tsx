"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Iworkout } from "@/types/index";

export interface PlanContextType {
  plan: Iworkout[];
  saved: Iworkout[];
  completedIds: number[];
  addToPlan: (workout: Iworkout) => void;
  addToSaved: (workout: Iworkout) => void;
  removeFromPlan: (id: number) => void;
  removeFromSaved: (id: number) => void;
  toggleComplete: (id: number) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Iworkout[]>([]);
  const [saved, setSaved] = useState<Iworkout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const storedPlan = window.localStorage.getItem("fitlog-plan");
    const storedSaved = window.localStorage.getItem("fitlog-saved");
    const storedCompleted = window.localStorage.getItem("fitlog-completed");

    startTransition(() => {
      if (storedPlan) setPlan(JSON.parse(storedPlan) as Iworkout[]);
      if (storedSaved) setSaved(JSON.parse(storedSaved) as Iworkout[]);
      if (storedCompleted)
        setCompletedIds(JSON.parse(storedCompleted) as number[]);
    });
  }, []);


  useEffect(() => {
    window.localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    window.localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

  useEffect(() => {
    window.localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(completedIds),
    );
  }, [completedIds]);

  const addToPlan = (workout: Iworkout) => {
    setPlan((currentPlan) =>
      currentPlan.some((item) => item.id === workout.id)
        ? currentPlan
        : [...currentPlan, workout],
    );
  };

  const addToSaved = (workout: Iworkout) => {
    setSaved((currentSaved) =>
      currentSaved.some((item) => item.id === workout.id)
        ? currentSaved
        : [...currentSaved, workout],
    );
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));

    setCompletedIds((prev) => prev.filter((completedId) => completedId !== id));
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleComplete = (id: number) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  return (
    <PlanContext.Provider
      value={{
        plan,
        saved,
        completedIds,
        addToPlan,
        addToSaved,
        removeFromPlan,
        removeFromSaved,
        toggleComplete,
      }}
    >
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const context = useContext(PlanContext);

  if (!context) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return context;
}
