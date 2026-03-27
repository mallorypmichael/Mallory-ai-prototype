const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"] as const;

/** Dots above the date (1+ items completed) — Figma: 3, 11 */
const DOT_DAYS = new Set([3, 11]);
/** Underline below the date (all daily goals) — Figma: 4–6, 17–20 */
const UNDERLINE_DAYS = new Set([4, 5, 6, 17, 18, 19, 20]);
const SELECTED_DAY = 23;

/** Calendar + stats in one bordered card (Figma Overview sidebar). */
export function LearningCalendarCard() {
  return (
    <div className="w-full lg:w-[426px] flex-shrink-0 self-start">
      <div className="bg-white border border-grey-100 rounded-16 p-16 md:p-24">
        <div className="flex items-center justify-between mb-16 md:mb-24">
          <span className="cds-subtitle-md text-grey-975">January 2026</span>
          <div className="flex gap-8">
            <button
              type="button"
              aria-label="Previous month"
              className="flex items-center justify-center size-24 rounded-8 text-grey-975 hover:bg-blue-25 transition-colors duration-fast"
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                chevron_left
              </span>
            </button>
            <button
              type="button"
              aria-label="Next month"
              className="flex items-center justify-center size-24 rounded-8 text-grey-975 hover:bg-blue-25 transition-colors duration-fast"
            >
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                chevron_right
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-y-8 gap-x-4 mb-8">
          {WEEKDAYS.map((d) => (
            <div key={d} className="cds-body-secondary text-grey-600 text-center py-6">
              {d}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-y-8 gap-x-4">
          {(() => {
            const startPad = 4;
            const cells: (number | null)[] = [
              ...Array(startPad).fill(null),
              ...Array.from({ length: 31 }, (_, i) => i + 1),
            ];
            return cells.map((day, idx) => {
              if (day === null) {
                return <div key={`pad-${idx}`} className="min-h-48" />;
              }
              const isSelected = day === SELECTED_DAY;
              const hasDot = DOT_DAYS.has(day) && !isSelected;
              const hasUnderline = UNDERLINE_DAYS.has(day) && !isSelected;

              return (
                <div
                  key={day}
                  className={`relative flex min-h-48 items-center justify-center cds-body-primary rounded-8 hover:bg-grey-25 cursor-default ${
                    isSelected ? "" : "text-grey-975"
                  }`}
                >
                  {hasDot ? (
                    <span className="absolute top-4 left-1/2 -translate-x-1/2 size-4 rounded-full bg-purple-700" />
                  ) : null}
                  {isSelected ? (
                    <span className="flex items-center justify-center size-32 rounded-full border-2 border-purple-700 bg-white text-grey-975">
                      {day}
                    </span>
                  ) : (
                    <span>{day}</span>
                  )}
                  {hasUnderline && !isSelected ? (
                    <span className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-2 bg-purple-700" />
                  ) : null}
                </div>
              );
            });
          })()}
        </div>

        <div className="flex flex-wrap gap-16 mt-24 pt-16 border-t border-grey-100">
          <div className="flex items-center gap-8">
            <span className="size-4 rounded-full bg-purple-700 flex-shrink-0" aria-hidden />
            <span className="cds-body-secondary text-grey-600">1+ items completed</span>
          </div>
          <div className="flex items-center gap-8">
            <span className="w-16 h-4 bg-purple-700 rounded-2 flex-shrink-0" aria-hidden />
            <span className="cds-body-secondary text-grey-600">All daily goals completed</span>
          </div>
        </div>

        <div className="border-t border-grey-100 pt-16 mt-24">
          <p className="cds-subtitle-md text-grey-600 mb-16">January 23 stats</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 mb-16">
            <div>
              <p className="cds-body-secondary text-grey-600 mb-4">Minutes learned</p>
              <p className="cds-title-xs text-grey-975">50</p>
            </div>
            <div>
              <p className="cds-body-secondary text-grey-600 mb-4">Items completed</p>
              <p className="cds-title-xs text-grey-975">20</p>
            </div>
          </div>
          <div>
            <p className="cds-body-secondary text-grey-600 mb-4">Highest grade</p>
            <p className="cds-title-xs text-grey-975">85.5%</p>
          </div>
        </div>
      </div>
    </div>
  );
}
