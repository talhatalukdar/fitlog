import { Clock, Flame, Star } from "lucide-react";

export default function StatsRow({
  duration,
  calories,
  rating,
  className = "",
  variant = "muted",
  divider = true,
}) {
  const iconClass = variant === "accent" ? "text-accent" : "text-muted";

  return (
    <div
      className={`flex items-center gap-3 text-xs text-muted ${
        divider ? "border-t border-border pt-2.5" : ""
      } ${className}`}
    >
      <span className="flex items-center gap-1">
        <Clock size={13} className={iconClass} />
        {duration} min
      </span>

      <span className="flex items-center gap-1">
        <Flame size={13} className={iconClass} />
        {calories} kcal
      </span>

      <span className="flex items-center gap-1">
        <Star size={13} className={iconClass} />
        {rating}
      </span>
    </div>
  );
}