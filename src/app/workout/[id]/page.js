"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { CalendarPlus, Bookmark, ArrowLeft } from "lucide-react";
import CategoryPills from "@/components/CategoryPills";
import Loader from "@/components/Loader";
import { getWorkout } from "@/lib/api";
import { usePlan } from "@/context/PlanContext";

const SPEC_ROWS = [
  { key: "equipment", label: "Equipment" },
  { key: "difficulty", label: "Difficulty" },
  { key: "sets", label: "Sets" },
  { key: "reps", label: "Reps" },
  { key: "duration", label: "Duration", suffix: " min" },
  { key: "caloriesBurned", label: "Calories", suffix: " kcal" },
  { key: "rating", label: "Rating" },
];

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { addToPlan, addToSaved, isInPlan, isSaved, plan } = usePlan();

  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    let active = true;

    setLoading(true);

    getWorkout(id)
      .then((data) => {
        if (!active) return;

        if (!data || data.error) {
          setNotFound(true);
        } else {
          setWorkout(data);
        }
      })
      .catch(() => {
        if (active) {
          setNotFound(true);
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [id]);

  if (loading) {
    return <Loader label="Loading workout..." />;
  }

  if (notFound || !workout) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">
          Workout not found
        </h1>

        <p className="mt-2 text-sm text-muted">
          That lift doesn&apos;t exist in the library.
        </p>

        <button
          onClick={() => router.push("/")}
          className="accent-pill mt-6 inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-display text-sm font-semibold uppercase"
        >
          Back to library
        </button>
      </div>
    );
  }

  const alreadyPlanned = isInPlan(workout.id);
  const alreadySaved = isSaved(workout.id);
  const planFull = plan.length >= 5 && !alreadyPlanned;

  return (
    <div className="mx-auto max-w-[1920px] px-6 py-10 lg:px-12">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground"
      >
        <ArrowLeft size={16} />
        Back to library
      </Link>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        <div className="relative h-72 w-full overflow-hidden rounded-2xl bg-black/30 sm:h-96">
          <Image
            src={workout.image}
            alt={workout.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        <div>
          <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
            {workout.name}
          </h1>

          <p className="mt-3 text-sm leading-relaxed text-muted">
            {workout.description}
          </p>

          <div className="mt-4">
            <CategoryPills tags={workout.muscleGroups} />
          </div>

          <div className="card-surface mt-6 divide-y divide-border rounded-xl">
            {SPEC_ROWS.map((row) => (
              <div
                key={row.key}
                className="flex items-center justify-between px-4 py-2.5 text-sm"
              >
                <span className="font-display text-xs uppercase tracking-wide text-muted">
                  {row.label}
                </span>

                <span className="font-medium">
                  {workout[row.key]}
                  {row.suffix || ""}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Instructions
            </h2>

            <ol className="mt-3 space-y-2.5">
              {workout.instructions.map((step, idx) => (
                <li
                  key={idx}
                  className="flex gap-2 text-sm text-muted"
                >
                  <span className="flex-none text-foreground">
                    {idx + 1}.
                  </span>

                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => addToPlan(workout)}
              disabled={alreadyPlanned || planFull}
              className="accent-pill flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CalendarPlus size={18} />

              {alreadyPlanned
                ? "In today's plan"
                : "Add to today's plan"}
            </button>

            <button
              onClick={() => addToSaved(workout)}
              disabled={alreadySaved}
              className="outline-pill flex items-center justify-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide transition disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Bookmark size={18} />

              {alreadySaved ? "Saved" : "Save for later"}
            </button>
          </div>

          {planFull && (
            <p className="mt-2 text-xs text-muted">
              Today&apos;s plan is capped at 5 lifts. Remove one to add
              another.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}