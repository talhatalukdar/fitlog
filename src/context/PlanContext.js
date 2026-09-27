"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { toast } from "react-toastify";

const PlanContext = createContext(null);

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const DONE_KEY = "fitlog:done";

export const PLAN_CAP = 5;

function loadList(key) {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function PlanProvider({ children }) {
  const [plan, setPlan] = useState([]);
  const [saved, setSaved] = useState([]);
  const [done, setDone] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setPlan(loadList(PLAN_KEY));
    setSaved(loadList(SAVED_KEY));
    setDone(loadList(DONE_KEY));
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(PLAN_KEY, JSON.stringify(plan));
  }, [plan, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(SAVED_KEY, JSON.stringify(saved));
  }, [saved, hydrated]);

  const isInPlan = useCallback(
    (id) => plan.some((w) => w.id === id),
    [plan]
  );

  const isSaved = useCallback(
    (id) => saved.some((w) => w.id === id),
    [saved]
  );

  const addToPlan = useCallback(
    (workout) => {
      if (isInPlan(workout.id)) {
        toast.info(`${workout.name} is already in today's plan`);
        return;
      }

      if (plan.length >= PLAN_CAP) {
        toast.error(`Plan is capped at ${PLAN_CAP} lifts for today`);
        return;
      }

      setPlan((prev) => [...prev, workout]);
      toast.success("Added to today's plan");
    },
    [isInPlan, plan.length]
  );

  const addToSaved = useCallback(
    (workout) => {
      if (isSaved(workout.id)) {
        toast.info(`${workout.name} is already saved`);
        return;
      }

      setSaved((prev) => [...prev, workout]);
      toast.success("Saved for later");
    },
    [isSaved]
  );

  const removeFromPlan = useCallback((id) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDone((prev) => prev.filter((d) => d !== id));
    toast.info("Removed from today's plan");
  }, []);

  const removeFromSaved = useCallback((id) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    toast.info("Removed from saved");
  }, []);

  const toggleDone = useCallback((id) => {
    setDone((prev) => {
      const next = prev.includes(id)
        ? prev.filter((d) => d !== id)
        : [...prev, id];

      toast.success(
        next.includes(id) ? "Marked as done" : "Marked as not done"
      );

      return next;
    });
  }, []);

  const isDone = useCallback((id) => done.includes(id), [done]);

  const value = useMemo(
    () => ({
      plan,
      saved,
      done,
      hydrated,
      isInPlan,
      isSaved,
      isDone,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    }),
    [
      plan,
      saved,
      done,
      hydrated,
      isInPlan,
      isSaved,
      isDone,
      addToPlan,
      addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
    ]
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);

  if (!ctx) {
    throw new Error("usePlan must be used within a PlanProvider");
  }

  return ctx;
}