"use client";

import { Search } from "lucide-react";

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search workouts...",
}) {
  return (
    <div className="card-surface flex items-center gap-2 rounded-lg px-3 py-2">
      <Search size={16} className="text-muted" />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-foreground placeholder:text-muted focus:outline-none"
      />
    </div>
  );
}