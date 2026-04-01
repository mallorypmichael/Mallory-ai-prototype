import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { OpenAIEnrollment } from "../../data/mockData";

/* ── Progress ring (inline-sized) ────────────── */

function ProgressRing({ percent, size = 64 }: { percent: number; size?: number }) {
  const sw = 6;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size, flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--oai-bg-tertiary)" strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--oai-accent)" strokeWidth={sw}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        />
      </svg>
      <span className="absolute" style={{ fontSize: 16, fontWeight: 500, color: "var(--oai-accent)" }}>
        {percent}%
      </span>
    </div>
  );
}

/* ── Module segmented bar ────────────────────── */

function ModuleBar({ enrollment }: { enrollment: OpenAIEnrollment }) {
  const completedModules = enrollment.modules.filter(
    (m) => m.items.every((i) => i.completed)
  ).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div className="oai-module-bar">
        {enrollment.modules.map((m) => {
          const allDone = m.items.every((i) => i.completed);
          const isCurrent = m.id === enrollment.currentModuleId;
          const state = allDone ? "complete" : isCurrent ? "current" : "upcoming";
          return <div key={m.id} className="oai-module-segment" data-state={state} />;
        })}
      </div>
      <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
        {completedModules === enrollment.modules.length
          ? `All ${enrollment.modules.length} modules complete`
          : `Module ${completedModules + 1} of ${enrollment.modules.length}`}
      </span>
    </div>
  );
}

/* ── Resume hero card ────────────────────────── */

interface ResumeHeroCardProps {
  enrollment: OpenAIEnrollment;
  onResume: (id: string) => void;
  onExpand: (id: string) => void;
}

function ResumeHeroCard({ enrollment, onResume, onExpand }: ResumeHeroCardProps) {
  const currentModule = enrollment.modules.find((m) => m.id === enrollment.currentModuleId);

  return (
    <div className="oai-resume-hero" style={{ position: "relative" }}>
      <button
        type="button"
        className="oai-enrollment-card-expand"
        onClick={() => onExpand(enrollment.id)}
        aria-label="Expand to full view"
        style={{ position: "absolute", top: 28, right: 28, zIndex: 1 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>open_in_full</span>
      </button>

      <div style={{ display: "flex", flexDirection: "column", gap: 20, width: "100%", minWidth: 0 }}>
        <div className="oai-resume-hero-header" style={{ paddingRight: 48 }}>
          <ProgressRing percent={enrollment.progressPercent} size={64} />
          <div className="oai-resume-hero-info">
            <span className="oai-heading-md">{enrollment.title}</span>
            <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
              {enrollment.level} &middot; {enrollment.estimatedHours} hours
            </span>
          </div>
        </div>

        {currentModule && enrollment.status === "In progress" && (
          <div className="oai-resume-position">
            <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
              Pick up where you left off
            </span>
            <span className="oai-heading-sm">
              {currentModule.title} &rsaquo; {enrollment.currentItemTitle}
            </span>
          </div>
        )}

        {enrollment.status === "Complete" && (
          <div className="oai-resume-position">
            <span className="oai-heading-sm" style={{ color: "var(--oai-accent)" }}>
              Course complete
            </span>
          </div>
        )}

        <ModuleBar enrollment={enrollment} />

        {enrollment.status === "In progress" && (
          <div>
            <button
              className="oai-btn-primary"
              style={{ padding: "10px 28px", fontSize: 15 }}
              onClick={() => onResume(enrollment.id)}
            >
              Resume
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Sequential course strip ─────────────────── */

interface CourseProgressStripProps {
  enrollments: OpenAIEnrollment[];
  onSelect: (id: string) => void;
}

function CourseProgressStrip({ enrollments, onSelect }: CourseProgressStripProps) {
  const [tip, setTip] = useState<{ text: string; left: number; top: number } | null>(null);

  const showTip = useCallback((el: HTMLElement, text: string) => {
    const r = el.getBoundingClientRect();
    const maxW = 280;
    const margin = 16;
    let left = r.left;
    const top = r.bottom + 8;
    if (left + maxW > window.innerWidth - margin) {
      left = Math.max(margin, window.innerWidth - margin - maxW);
    }
    setTip({ text, left, top });
  }, []);

  const hideTip = useCallback(() => setTip(null), []);

  return (
    <>
      <div className="oai-course-strip">
        {enrollments.map((course, i) => {
          const state =
            course.status === "Complete" ? "complete" : course.status === "In progress" ? "current" : "upcoming";
          const stripLabel = course.stripTitle ?? course.title;
          return (
            <div key={course.id} style={{ display: "contents" }}>
              {i > 0 && (
                <div
                  className="oai-course-strip-connector"
                  data-done={enrollments[i - 1].status === "Complete"}
                />
              )}
              <button
                type="button"
                className="oai-course-strip-item"
                data-state={state}
                aria-label={
                  state === "upcoming" ? `${course.title}, locked` : `${course.title}, view course`
                }
                onMouseEnter={(ev) => showTip(ev.currentTarget, course.title)}
                onMouseLeave={hideTip}
                onFocus={(ev) => showTip(ev.currentTarget, course.title)}
                onBlur={hideTip}
                onClick={() => state !== "upcoming" && onSelect(course.id)}
              >
                <span className="oai-course-strip-icon" data-state={state}>
                  {state === "complete" ? (
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>check</span>
                  ) : state === "current" ? null : (
                    <span className="material-symbols-rounded" style={{ fontSize: 14 }}>lock</span>
                  )}
                </span>
                <span className="oai-course-strip-label">{stripLabel}</span>
              </button>
            </div>
          );
        })}
      </div>
      {tip &&
        createPortal(
          <div
            role="tooltip"
            className="oai-course-strip-tooltip"
            style={{ position: "fixed", left: tip.left, top: tip.top, zIndex: 10000 }}
          >
            {tip.text}
          </div>,
          document.body
        )}
    </>
  );
}

/* ── My Learning Light (composed) ────────────── */

interface MyLearningLightProps {
  enrollments: OpenAIEnrollment[];
  onExpand: (id: string) => void;
  onResume: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function MyLearningLight({ enrollments, onExpand, onResume, onViewDetails }: MyLearningLightProps) {
  const currentCourse = enrollments.find((e) => e.status !== "Complete") ?? enrollments[enrollments.length - 1];

  if (!currentCourse) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", alignItems: "stretch" }}>
      <ResumeHeroCard
        enrollment={currentCourse}
        onResume={onResume}
        onExpand={onExpand}
      />
      <CourseProgressStrip
        enrollments={enrollments}
        onSelect={onViewDetails}
      />
    </div>
  );
}
