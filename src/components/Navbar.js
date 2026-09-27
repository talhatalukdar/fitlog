"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { usePlan } from "@/context/PlanContext";

const links = [
  { href: "/", label: "Workouts" },
  { href: "/my-plan", label: "My Plan" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { plan, saved } = usePlan();

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur">
      <nav className="mx-auto flex max-w-[1920px] items-center justify-between px-6 py-4 lg:px-12">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={26}
            height={26}
          />

          <span className="font-display text-lg font-semibold tracking-wide">
            FITLOG
          </span>
        </Link>

        <div className="hidden items-center gap-2 md:flex">
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-display rounded-full px-4 py-1.5 text-sm font-semibold uppercase tracking-wide transition ${
                  active
                    ? "accent-pill"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            Plan

            <span className="accent-pill flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold">
              {plan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            Saved

            <span className="outline-pill flex h-5 w-5 items-center justify-center rounded-full text-[11px] font-bold">
              {saved.length}
            </span>
          </Link>
        </div>
      </nav>

      <div className="flex items-center justify-center gap-2 border-t border-border py-2 md:hidden">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display rounded-full px-4 py-1 text-sm font-semibold uppercase tracking-wide ${
                active ? "accent-pill" : "text-muted"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </div>
    </header>
  );
}