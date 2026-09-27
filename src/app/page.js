export default function Home() {
  return (
    <main className="flex min-h-[70vh] items-center justify-center">
      <div className="text-center">
        <p className="font-display text-sm uppercase tracking-[0.3em] text-muted">
          Welcome to
        </p>

        <h1 className="mt-3 font-display text-6xl font-bold tracking-tight">
          FITLOG
        </h1>

        <p className="mx-auto mt-4 max-w-md text-muted">
          Your workout library for discovering exercises and building your
          training plan.
        </p>
      </div>
    </main>
  );
}