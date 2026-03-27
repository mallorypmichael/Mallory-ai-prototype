import type { OverviewSkillProgressItem } from "../../data/mockData";

function SkillBarRow({ title, current, total }: { title: string; current: number; total: number }) {
  const pct = total > 0 ? Math.min(100, Math.round((current / total) * 100)) : 0;
  const complete = current >= total;

  return (
    <div className="flex flex-col gap-8 min-w-0">
      <div className="flex items-center justify-between gap-8">
        <span className="cds-body-primary text-grey-975 truncate">{title}</span>
        <div className="flex items-center gap-8 flex-shrink-0">
          <span className="cds-body-primary text-grey-600 whitespace-nowrap">
            {current}/{total}
          </span>
          <span
            className={`flex size-24 flex-shrink-0 items-center justify-center rounded-full ${
              complete ? "bg-purple-700" : "bg-grey-200"
            }`}
            aria-hidden
          >
            <span className="material-symbols-rounded material-symbols-fill text-white" style={{ fontSize: 14 }}>
              star
            </span>
          </span>
        </div>
      </div>
      <div className="h-8 w-full bg-grey-100 rounded-4 overflow-hidden">
        <div
          className="h-full bg-purple-700 rounded-4 transition-all duration-slow ease-standard"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

interface SkillProgressGridProps {
  skills: OverviewSkillProgressItem[];
}

/** Figma "Bar + Star" skill tiles (2-column grid from md). */
export function SkillProgressGrid({ skills }: SkillProgressGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">
      {skills.map((row) => (
        <SkillBarRow key={row.id} title={row.label} current={row.current} total={row.total} />
      ))}
    </div>
  );
}
