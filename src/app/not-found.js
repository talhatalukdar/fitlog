import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-5 py-32 text-center">
      <p className="font-display text-6xl font-bold text-accent">404</p>
      <h1 className="font-display mt-4 text-2xl font-bold uppercase tracking-wide">
        Page not found
      </h1>
      <p className="mt-2 text-sm text-muted">
        The page you&apos;re looking for isn&apos;t part of the library.
      </p>
      <Link
        href="/"
        className="accent-pill mt-6 rounded-full px-6 py-3 font-display text-sm font-semibold uppercase tracking-wide"
      >
        Back to home
      </Link>
    </div>
  );
}
