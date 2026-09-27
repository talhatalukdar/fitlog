"use client";

import { useEffect, useState } from "react";
import Hero from "@/components/Hero";
import WorkoutCard from "@/components/WorkoutCard";
import Loader from "@/components/Loader";
import { getWorkouts } from "@/lib/api";

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let active = true;

    getWorkouts()
      .then((data) => {
        if (active) setWorkouts(data);
      })
      .catch(() => {
        if (active) {
          setError("Could not load the workout library. Try again.");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Hero />

      <section
        id="library"
        className="mx-auto max-w-[1920px] px-6 pb-24 lg:px-12"
      >
        <div className="border-b border-border pb-6">
          <h2 className="font-display text-3xl font-bold uppercase tracking-wide">
            The Library
          </h2>

          <p className="mt-1 text-sm text-muted">
            Twelve lifts covering every major muscle group.
          </p>
        </div>

        <div className="mt-8">
          {loading && <Loader label="Loading the library..." />}

          {!loading && error && (
            <p className="py-16 text-center text-sm text-muted">{error}</p>
          )}

          {!loading && !error && workouts.length > 0 && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {workouts.map((workout) => (
                <WorkoutCard key={workout.id} workout={workout} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}