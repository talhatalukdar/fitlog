import Image from "next/image";
import { Dumbbell } from "lucide-react";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1920px] px-6 pb-16 pt-10 lg:px-12">
      <div className="card-surface grid grid-cols-1 items-center gap-10 rounded-3xl px-6 py-12 sm:px-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="font-display text-sm font-semibold uppercase tracking-[0.3em] text-accent">
            Workout Library
          </p>

          <h1 className="font-display mt-4 text-4xl font-bold uppercase leading-tight tracking-wide sm:text-5xl">
            Train with intent. Log
            <br />
            every set.
          </h1>

          <p className="mt-5 max-w-md text-base text-muted">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today&apos;s plan, and watch the week&apos;s work add up.
          </p>

          <a
            href="#library"
            className="accent-pill mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide transition hover:brightness-95"
          >
            <Dumbbell size={18} />
            Browse Workouts
          </a>
        </div>

        <div className="relative mx-auto h-64 w-64 sm:h-80 sm:w-80">
          <div className="absolute inset-0 rounded-full bg-accent/10 blur-2xl" />

          <Image
            src="/banner.png"
            alt="Workout illustration"
            fill
            className="relative object-contain"
            priority
          />
        </div>
      </div>
    </section>
  );
}