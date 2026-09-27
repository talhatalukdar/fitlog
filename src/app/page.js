import Hero from "@/components/Hero";

export default function Home() {
  return (
    <>
      <Hero />

      <section id="library" className="mx-auto max-w-[1920px] px-6 pb-16 lg:px-12">
        <div className="card-surface rounded-3xl p-8 text-center">
          <h2 className="font-display text-2xl font-bold uppercase tracking-wide">
            Workout Library
          </h2>

          <p className="mt-2 text-sm text-muted">
            Workouts will appear here in the next milestone.
          </p>
        </div>
      </section>
    </>
  );
}