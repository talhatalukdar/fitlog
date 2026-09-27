export default function CategoryPills({ tags = [] }) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span
          key={tag}
          className="accent-pill rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}