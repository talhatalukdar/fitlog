"use client";

import { ChevronDown } from "lucide-react";

const OPTIONS = [
  { value: "duration", label: "Duration" },
  { value: "caloriesBurned", label: "Calories" },
  { value: "rating", label: "Rating" },
];

export default function SortDropdown({ value, onChange }) {
  return (
    <label className="relative inline-flex items-center">
      <span className="mr-2 text-sm text-muted">Sort By</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="card-surface appearance-none rounded-lg py-2 pl-3 pr-8 text-sm font-medium focus:border-accent focus:outline-none"
      >
        {OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted"
      />
    </label>
  );
}