"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, X } from "lucide-react";
import StatsRow from "@/components/StatsRow";
import SearchBar from "@/components/SearchBar";
import SortDropdown from "@/components/SortDropdown";
import { usePlan, PLAN_CAP } from "@/context/PlanContext";

function MetricsSummary({ exercises, minutes, calories }) {
  const items = [
    { label: "Exercises", value: exercises, accent: true },
    { label: "Minutes", value: minutes, accent: false },
    { label: "Calories", value: calories, accent: false },
  ];
  return (
    <div className="card-surface mt-6 grid grid-cols-3 divide-x divide-border rounded-xl">
      {items.map((item) => (
        <div key={item.label} className="px-5 py-4 text-center">
          <p
            className={`font-display text-3xl font-bold ${
              item.accent ? "text-accent" : "text-foreground"
            }`}
          >
            {item.value}
          </p>
          <p className="font-display mt-1 text-xs uppercase tracking-wide text-muted">
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}

function TabSwitch({ tab, onChange }) {
  const tabs = [
    { id: "plan", label: "Today's Plan" },
    { id: "saved", label: "Saved" },
  ];
  return (
    <div className="card-surface inline-flex gap-1 rounded-full p-1">
      {tabs.map((t) => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`font-display rounded-full px-4 py-2 text-sm font-semibold uppercase tracking-wide transition ${
            tab === t.id
              ? "bg-foreground text-background"
              : "text-muted hover:text-foreground"
          }`}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
      <h3 className="font-display text-xl font-bold uppercase tracking-wide">
        Nothing here yet
      </h3>
      <p className="whitespace-nowrap text-sm text-muted">
        Browse the library and add a lift to get today moving.
      </p>
      <div className="my-1 flex items-center gap-3">
        <span className="h-px w-10 bg-border" />
        <span className="h-px w-10 bg-border" />
      </div>
      <Link
        href="/"
        className="accent-pill rounded-full px-5 py-2.5 font-display text-sm font-semibold uppercase tracking-wide"
      >
        Go to workouts
      </Link>
    </div>
  );
}

function PlanItemCard({ workout, isDone, onToggleDone, onRemove, showDone }) {
  return (
    <div className="card-surface flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center">
      <div className="relative h-20 w-full flex-none overflow-hidden rounded-lg bg-black/30 sm:w-28">
        <Image src={workout.image} alt={workout.name} fill className="object-cover" />
      </div>
      <div className="flex-1">
        <h3
          className={`font-display text-base font-semibold uppercase tracking-wide ${
            isDone ? "text-muted line-through" : ""
          }`}
        >
          {workout.name}
        </h3>
        <p className="text-sm text-muted">{workout.equipment}</p>
        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          variant="accent"
          divider={false}
          className="mt-2"
        />
      </div>
      <div className="flex flex-none flex-wrap items-center gap-2">
        <Link
          href={`/workout/${workout.id}`}
          className="outline-pill rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
        >
          View Details
        </Link>
        {showDone && (
          <button
            onClick={() => onToggleDone(workout.id)}
            className="accent-pill flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-wide"
          >
            <CheckCircle2 size={14} />
            {isDone ? "Done" : "Mark as Done"}
          </button>
        )}
        <button
          onClick={() => onRemove(workout.id)}
          title="Remove"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition hover:border-red-400 hover:text-red-400"
        >
          <X size={18} />
        </button>
      </div>
    </div>
  );
}

export default function MyPlanPage() {
  const {
    plan,
    saved,
    hydrated,
    isDone,
    toggleDone,
    removeFromPlan,
    removeFromSaved,
  } = usePlan();
  const [tab, setTab] = useState("plan");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  const activeList = tab === "plan" ? plan : saved;

  const filteredList = useMemo(() => {
    const filtered = activeList.filter((w) =>
      `${w.name} ${w.muscleGroups.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase())
    );
    return [...filtered].sort((a, b) => b[sortBy] - a[sortBy]);
  }, [activeList, query, sortBy]);

  const metrics = useMemo(
    () => ({
      exercises: plan.length,
      minutes: plan.reduce((sum, w) => sum + w.duration, 0),
      calories: plan.reduce((sum, w) => sum + w.caloriesBurned, 0),
    }),
    [plan]
  );

  return (
    <div className="mx-auto max-w-[1920px] px-6 py-10 lg:px-12">
      <h1 className="font-display text-3xl font-bold uppercase tracking-wide">
        My Plan
      </h1>
      <p className="mt-1 text-sm text-muted">
        Cap of {PLAN_CAP} lifts for today. Finish them, then load more.
      </p>

      <MetricsSummary
        exercises={metrics.exercises}
        minutes={metrics.minutes}
        calories={metrics.calories}
      />

      <div className="mt-8 flex flex-col gap-4 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <TabSwitch tab={tab} onChange={setTab} />
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <SearchBar value={query} onChange={setQuery} placeholder="Search your plan..." />
          <SortDropdown value={sortBy} onChange={setSortBy} />
        </div>
      </div>

      <div className="mt-6">
        {!hydrated ? (
          <p className="py-16 text-center text-sm text-muted">
            Loading workouts...
          </p>
        ) : filteredList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {filteredList.map((workout) => (
              <PlanItemCard
                key={workout.id}
                workout={workout}
                isDone={isDone(workout.id)}
                onToggleDone={toggleDone}
                showDone={tab === "plan"}
                onRemove={tab === "plan" ? removeFromPlan : removeFromSaved}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
