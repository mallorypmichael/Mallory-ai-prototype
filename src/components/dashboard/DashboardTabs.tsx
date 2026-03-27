export type DashboardTabId = "overview" | "skills" | "inProgress" | "saved" | "certificates";

const TABS: { id: DashboardTabId; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "inProgress", label: "In progress" },
  { id: "saved", label: "Saved" },
  { id: "certificates", label: "Certificates" },
];

interface DashboardTabsProps {
  active: DashboardTabId;
  onChange: (id: DashboardTabId) => void;
}

export function DashboardTabs({ active, onChange }: DashboardTabsProps) {
  return (
    <div className="border-b border-grey-100 mb-16 md:mb-24">
      <div
        className="flex gap-16 md:gap-24 overflow-x-auto pb-0 -mb-px"
        role="tablist"
        aria-label="Dashboard sections"
      >
        {TABS.map((tab) => {
          const selected = active === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => onChange(tab.id)}
              className={`relative min-h-48 shrink-0 py-12 px-0 transition-colors duration-fast ${
                selected
                  ? "cds-action-primary text-grey-975"
                  : "cds-body-primary text-grey-600 hover:text-grey-900"
              }`}
            >
              {tab.label}
              {selected ? (
                <span
                  className="absolute bottom-0 left-0 right-0 h-4 bg-grey-975 rounded-t-4"
                  aria-hidden
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
