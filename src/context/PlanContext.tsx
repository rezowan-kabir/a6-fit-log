"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Iworkout } from "@/types/index";

interface PlanContextValue {
  plan: Iworkout[];
  saved: Iworkout[];
  addToPlan: (workout: Iworkout) => void;
  addToSaved: (workout: Iworkout) => void;
}

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<Iworkout[]>([]);
  const [saved, setSaved] = useState<Iworkout[]>([]);

  useEffect(() => {
    const storedPlan = window.localStorage.getItem("fitlog-plan");
    const storedSaved = window.localStorage.getItem("fitlog-saved");

    if (storedPlan) setPlan(JSON.parse(storedPlan) as Iworkout[]);
    if (storedSaved) setSaved(JSON.parse(storedSaved) as Iworkout[]);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("fitlog-plan", JSON.stringify(plan));
  }, [plan]);

  useEffect(() => {
    window.localStorage.setItem("fitlog-saved", JSON.stringify(saved));
  }, [saved]);

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

  return (
    <PlanContext.Provider value={{ plan, saved, addToPlan, addToSaved }}>
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
