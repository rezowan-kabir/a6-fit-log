"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import toast from "react-hot-toast";
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
    if (plan.length >= 5) {
      toast.error("Plan is full! Max 5 workouts.");
      return;
    }

    if (plan.some((item) => item.id === workout.id)) {
      toast.error("This workout is already in today's plan.");
      return;
    }

    setPlan([...plan, workout]);
    toast.success("Added to today's plan!");
  };

  const addToSaved = (workout: Iworkout) => {
    if (saved.some((item) => item.id === workout.id)) {
      toast.error("This workout is already saved.");
      return;
    }

    setSaved([...saved, workout]);
    toast.success("Workout saved for later!");
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((item) => item.id !== id));

    setCompletedIds((prev) => prev.filter((completedId) => completedId !== id));
    toast.success("Removed from today's plan.");
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((item) => item.id !== id));
    toast.success("Removed from saved workouts.");
  };

  const toggleComplete = (id: number) => {
    const isCompleted = completedIds.includes(id);
    setCompletedIds(
      isCompleted
        ? completedIds.filter((item) => item !== id)
        : [...completedIds, id],
    );
    toast.success(isCompleted ? "Workout marked as active." : "Workout completed!");
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
