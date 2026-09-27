
import Image from "next/image";
import Link from "next/link";
import CategoryPills from "./CategoryPills";
import StatsRow from "./StatsRow";

export default function WorkoutCard({ workout }) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="card-surface group flex cursor-pointer flex-col overflow-hidden rounded-2xl transition hover:border-accent"
    >
      <div className="relative h-68 w-full overflow-hidden bg-black/30">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <CategoryPills tags={workout.muscleGroups} />

        <h3 className="font-display text-lg font-semibold uppercase tracking-wide">
          {workout.name}
        </h3>

        <p className="text-sm text-muted">{workout.equipment}</p>

        <StatsRow
          duration={workout.duration}
          calories={workout.caloriesBurned}
          rating={workout.rating}
          className="mt-auto"
        />
      </div>
    </Link>
  );
}
