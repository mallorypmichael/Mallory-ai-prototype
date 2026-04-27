import { useCallback, useState } from "react";
import { createPortal } from "react-dom";
import type { OpenAIEnrollment } from "../../data/mockData";
import { isFirstIncompleteCourse } from "../../lib/openAILearningPath";

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
  const notStarted = enrollment.status === "Not started";
  const completedModules = enrollment.modules.filter(
    (m) => m.items.every((i) => i.completed)
  ).length;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div className="oai-module-bar">
        {enrollment.modules.map((m) => {
          if (notStarted) {
            return <div key={m.id} className="oai-module-segment" data-state="upcoming" />;
          }
          const allDone = m.items.every((i) => i.completed);
          const isCurrent = m.id === enrollment.currentModuleId;
          const state = allDone ? "complete" : isCurrent ? "current" : "upcoming";
          return <div key={m.id} className="oai-module-segment" data-state={state} />;
        })}
      </div>
      <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
        {notStarted
          ? `${enrollment.modules.length} modules`
          : completedModules === enrollment.modules.length
            ? `All ${enrollment.modules.length} modules complete`
            : `Module ${completedModules + 1} of ${enrollment.modules.length}`}
      </span>
    </div>
  );
}

/* ── Static scattered confetti ──────────────── */

const CONFETTI_SEED = [
  { left: 8, top: 6, size: 6, color: "#f5a623", rot: 35, shape: "diamond" },
  { left: 18, top: 3, size: 5, color: "#e74c6b", rot: 120, shape: "rect" },
  { left: 30, top: 8, size: 7, color: "#f5a623", rot: 200, shape: "diamond" },
  { left: 42, top: 2, size: 5, color: "#4a9eff", rot: 60, shape: "triangle" },
  { left: 55, top: 5, size: 6, color: "#6b5ce7", rot: 310, shape: "rect" },
  { left: 65, top: 10, size: 5, color: "#4a9eff", rot: 150, shape: "diamond" },
  { left: 75, top: 3, size: 7, color: "#e74c6b", rot: 45, shape: "triangle" },
  { left: 85, top: 7, size: 5, color: "#f5a623", rot: 260, shape: "rect" },
  { left: 92, top: 12, size: 6, color: "#4a9eff", rot: 80, shape: "diamond" },
  { left: 12, top: 35, size: 4, color: "#4a9eff", rot: 190, shape: "rect" },
  { left: 50, top: 30, size: 5, color: "#f5a623", rot: 290, shape: "diamond" },
  { left: 70, top: 40, size: 4, color: "#6b5ce7", rot: 15, shape: "triangle" },
  { left: 88, top: 50, size: 6, color: "#4a9eff", rot: 140, shape: "diamond" },
  { left: 95, top: 25, size: 5, color: "#e74c6b", rot: 220, shape: "rect" },
  { left: 5, top: 55, size: 5, color: "#f5a623", rot: 330, shape: "triangle" },
  { left: 38, top: 60, size: 4, color: "#4a9eff", rot: 70, shape: "rect" },
  { left: 80, top: 70, size: 5, color: "#e74c6b", rot: 180, shape: "diamond" },
  { left: 22, top: 18, size: 4, color: "#6b5ce7", rot: 100, shape: "rect" },
  { left: 60, top: 15, size: 5, color: "#e74c6b", rot: 250, shape: "diamond" },
  { left: 48, top: 45, size: 4, color: "#6b5ce7", rot: 340, shape: "triangle" },
] as const;

function ScatteredConfetti() {
  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden", borderRadius: "inherit", pointerEvents: "none", zIndex: 0 }}>
      {CONFETTI_SEED.map((p, i) => {
        const clip = p.shape === "triangle"
          ? "polygon(50% 0%, 0% 100%, 100% 100%)"
          : p.shape === "diamond"
            ? "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
            : undefined;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${p.left}%`,
              top: `${p.top}%`,
              width: p.size,
              height: p.shape === "rect" ? p.size * 1.6 : p.size,
              background: p.color,
              borderRadius: p.shape === "rect" ? 1 : 0,
              clipPath: clip,
              transform: `rotate(${p.rot}deg)`,
              opacity: 0.75,
            }}
          />
        );
      })}
    </div>
  );
}

/* ── Certificate preview thumbnail ─────────── */

function CertificatePreview() {
  return (
    <div
      style={{
        width: 160,
        minWidth: 160,
        aspectRatio: "4/3",
        background: "linear-gradient(135deg, #f0f4ff 0%, #e8ecf4 100%)",
        borderRadius: "var(--oai-radius-md)",
        border: "1px solid var(--oai-border)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
        padding: 12,
        flexShrink: 0,
      }}
    >
      <span style={{ fontSize: 8, color: "var(--oai-text-tertiary)", letterSpacing: 0.5 }}>
        Certification of Appreciation
      </span>
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "#fff",
          border: "1px solid var(--oai-border)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path
            d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073z"
            fill="var(--oai-text-tertiary)"
          />
        </svg>
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 20, height: 2, background: "var(--oai-text-tertiary)", borderRadius: 1, opacity: 0.3 }} />
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 20, height: 2, background: "var(--oai-text-tertiary)", borderRadius: 1, opacity: 0.3 }} />
        </div>
      </div>
    </div>
  );
}

/* ── Celebration hero card (all courses complete) ── */

function CelebrationHeroCard({
  enrollments,
  onExpand,
}: {
  enrollments: OpenAIEnrollment[];
  onExpand: (id: string) => void;
}) {
  const lastCourse = enrollments[enrollments.length - 1];
  const learnerName = "Alex";
  const completionDate = "April 7, 2026";
  const programName = "OpenAI Certified";

  return (
    <div className="oai-resume-hero" style={{ position: "relative", overflow: "hidden" }}>
      <ScatteredConfetti />

      <button
        type="button"
        className="oai-enrollment-card-expand"
        onClick={() => onExpand(lastCourse.id)}
        aria-label="Expand to full view"
        style={{ position: "absolute", top: 28, right: 28, zIndex: 1 }}
      >
        <span className="material-symbols-rounded" style={{ fontSize: 16 }}>open_in_full</span>
      </button>

      <div style={{ display: "flex", gap: 28, width: "100%", minWidth: 0, position: "relative", zIndex: 1, alignItems: "flex-start" }}>
        {/* Left: text content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: 1, minWidth: 0 }}>
          <h2 className="oai-heading-lg" style={{ margin: 0, color: "var(--oai-text-primary)" }}>
            Congratulations!
          </h2>
          <p className="oai-body" style={{ margin: 0, color: "var(--oai-text-secondary)" }}>
            Completed by <strong style={{ color: "var(--oai-text-primary)" }}>{learnerName}</strong> on {completionDate}
          </p>
          <p className="oai-body-sm" style={{ margin: 0, color: "var(--oai-text-secondary)", lineHeight: 1.5 }}>
            You've now completed all {enrollments.length} courses in the {programName} program and earned the Credly course completion certification. Great work!
          </p>
          <div style={{ marginTop: 4 }}>
            <button
              className="oai-btn-primary"
              style={{ padding: "10px 28px", fontSize: 15 }}
              onClick={() => onExpand(lastCourse.id)}
            >
              View and accept certification
            </button>
          </div>
        </div>

        {/* Right: certificate preview */}
        <CertificatePreview />
      </div>
    </div>
  );
}

/* ── Resume hero card ────────────────────────── */

interface ResumeHeroCardProps {
  enrollment: OpenAIEnrollment;
  enrollments: OpenAIEnrollment[];
  onResume: (id: string) => void;
  onExpand: (id: string) => void;
}

function ResumeHeroCard({ enrollment, enrollments, onResume, onExpand }: ResumeHeroCardProps) {
  const currentModule = enrollment.modules.find((m) => m.id === enrollment.currentModuleId);
  const firstIncompleteHere = isFirstIncompleteCourse(enrollment, enrollments);

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
          {enrollment.status !== "Not started" && (
            <ProgressRing percent={enrollment.progressPercent} size={64} />
          )}
          <div className="oai-resume-hero-info">
            <span className="oai-heading-md">{enrollment.title}</span>
            <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
              {enrollment.level} &middot; {enrollment.estimatedHours} hours
            </span>
            {enrollment.status === "Not started" && (
              <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)", marginTop: 4 }}>
                {enrollment.shortDescription}
              </span>
            )}
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

        {enrollment.status === "Not started" && !firstIncompleteHere && (
          <div className="oai-resume-position">
            <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
              Complete previous courses in your path to unlock this course.
            </span>
          </div>
        )}

        {enrollment.status !== "Not started" && (
          <ModuleBar enrollment={enrollment} />
        )}

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

        {enrollment.status === "Not started" && firstIncompleteHere && (
          <div className="flex items-center" style={{ gap: 12 }}>
            <button
              className="oai-btn-primary"
              style={{ padding: "10px 28px", fontSize: 15 }}
              onClick={() => onResume(enrollment.id)}
            >
              Start
            </button>
            <button
              className="oai-btn-secondary"
              style={{ padding: "10px 28px", fontSize: 15 }}
              onClick={() => onExpand(enrollment.id)}
            >
              View details
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
          const state: "complete" | "current" | "upcoming" =
            course.status === "Complete"
              ? "complete"
              : isFirstIncompleteCourse(course, enrollments)
                ? "current"
                : "upcoming";
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
                onClick={() => onSelect(course.id)}
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
  const allComplete = enrollments.every((e) => e.status === "Complete");
  const currentCourse = enrollments.find((e) => e.status !== "Complete") ?? enrollments[enrollments.length - 1];

  if (!currentCourse) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12, width: "100%", alignItems: "stretch" }}>
      {allComplete ? (
        <CelebrationHeroCard enrollments={enrollments} onExpand={onExpand} />
      ) : (
        <ResumeHeroCard
          enrollment={currentCourse}
          enrollments={enrollments}
          onResume={onResume}
          onExpand={onExpand}
        />
      )}
      <CourseProgressStrip
        enrollments={enrollments}
        onSelect={onViewDetails}
      />
    </div>
  );
}
