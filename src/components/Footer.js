"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <footer className="border-t border-border bg-[#0c0e0d]">
      <div className="mx-auto flex max-w-[1920px] flex-col items-center justify-between gap-3 px-6 py-8 sm:flex-row lg:px-12">
        <div className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="FitLog logo"
            width={22}
            height={22}
            className={isHome ? "-rotate-45" : ""}
          />

          <span className="font-display text-base font-semibold tracking-wide">
            FITLOG
          </span>
        </div>

        <p className="text-sm text-muted">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}