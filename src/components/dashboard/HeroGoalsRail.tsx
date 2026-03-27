/**
 * Right column beside hero card — Today's goals + Weekly activity (Figma node 34:6506).
 */
const WEEKLY_DAYS: { label: string; state: "done" | "today" | "upcoming" }[] = [
  { label: "Tu", state: "done" },
  { label: "We", state: "done" },
  { label: "Th", state: "done" },
  { label: "Fr", state: "done" },
  { label: "Sa", state: "today" },
  { label: "Su", state: "upcoming" },
  { label: "Mo", state: "upcoming" },
];

export function HeroGoalsRail() {
  return (
    <div className="flex h-full min-h-0 flex-col gap-16 w-full lg:w-[321px] lg:flex-shrink-0">
      <div className="bg-white border border-grey-100 rounded-16 p-16 md:p-14">
        <div className="flex flex-wrap items-center gap-8 mb-12">
          <h3 className="cds-subtitle-md text-grey-975">Today&apos;s goals</h3>
          <span className="cds-action-secondary text-purple-800 rounded-32 px-8 py-2 bg-purple-25">
            Personalized
          </span>
        </div>
        <ul className="flex flex-col gap-8">
          <li className="flex items-start gap-12">
            <span
              className="flex size-24 flex-shrink-0 rounded-full hero-goals-star-circle items-center justify-center"
              aria-hidden
            >
              <span
                className="material-symbols-rounded material-symbols-fill hero-goals-star-icon"
                style={{ fontSize: 16 }}
              >
                star
              </span>
            </span>
            <span className="cds-body-primary text-grey-975">
              Complete any{" "}
              <span className="cds-action-primary text-grey-975">5 learning items</span> · 0/5
            </span>
          </li>
          <li className="flex items-start gap-12">
            <span
              className="flex size-24 flex-shrink-0 rounded-full hero-goals-star-circle items-center justify-center"
              aria-hidden
            >
              <span
                className="material-symbols-rounded material-symbols-fill hero-goals-star-icon"
                style={{ fontSize: 16 }}
              >
                star
              </span>
            </span>
            <span className="cds-body-primary text-grey-600">Complete 1 practice item</span>
          </li>
          <li className="flex items-start gap-12">
            <span
              className="flex size-24 flex-shrink-0 rounded-full hero-goals-star-circle items-center justify-center"
              aria-hidden
            >
              <span
                className="material-symbols-rounded material-symbols-fill hero-goals-star-icon"
                style={{ fontSize: 16 }}
              >
                star
              </span>
            </span>
            <span className="cds-body-primary text-grey-600">Use Coach</span>
          </li>
        </ul>
      </div>

      <div className="bg-white border border-grey-100 rounded-16 p-16 md:p-14 flex flex-1 flex-col min-h-0">
        <div className="flex flex-wrap items-center gap-8 mb-12">
          <h3 className="cds-subtitle-md text-grey-975">Weekly activity</h3>
          <span className="cds-action-secondary text-purple-800 rounded-32 px-8 py-2 bg-purple-25">
            1 week streak
          </span>
        </div>
        <p className="cds-body-primary text-grey-600 mb-16">
          Way to go! You&apos;ve exceeded your learning target by x days this week.
        </p>
        <div className="flex flex-wrap gap-8 mb-16">
          {WEEKLY_DAYS.map((d) => {
            if (d.state === "done") {
              return (
                <div
                  key={d.label}
                  className="size-32 rounded-8 bg-purple-25 flex items-center justify-center"
                >
                  <span className="material-symbols-rounded text-purple-700" style={{ fontSize: 16 }}>
                    check
                  </span>
                </div>
              );
            }
            if (d.state === "today") {
              return (
                <div
                  key={d.label}
                  className="size-32 rounded-8 border border-grey-400 bg-white flex items-center justify-center"
                >
                  <span className="cds-action-secondary text-grey-975">{d.label}</span>
                </div>
              );
            }
            return (
              <div
                key={d.label}
                className="size-32 rounded-8 bg-grey-100 flex items-center justify-center cds-body-secondary text-grey-600"
              >
                {d.label}
              </div>
            );
          })}
        </div>
        <p className="cds-body-secondary text-grey-600">3 items completed · 10 minutes learned</p>
      </div>
    </div>
  );
}
