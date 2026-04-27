import { useState } from "react";
import type { OpenAIEnrollment, OpenAIDailyGoal, OpenAIModuleItem, OpenAIWeeklyActivity, OpenAICertificate } from "../../data/mockData";
import { getFirstIncompleteCourse, isFirstIncompleteCourse, isNotStartedCourseLocked } from "../../lib/openAILearningPath";

/* ── ChatGPT Logo (reused from ChatGPTPage) ──── */

function ChatGPTLogo({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681l-.004 6.722zm1.097-2.365l2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5V10.5z"
        fill="currentColor"
      />
    </svg>
  );
}

/* ── Progress ring ───────────────────────────── */

function OaiProgressRing({ percent, size = 80 }: { percent: number; size?: number }) {
  const sw = 7;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (percent / 100) * c;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }} aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--oai-bg-tertiary)" strokeWidth={sw} />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke="var(--oai-accent)" strokeWidth={sw}
          strokeDasharray={c} strokeDashoffset={offset} strokeLinecap="round"
        />
      </svg>
      <span className="absolute oai-heading-md" style={{ color: "var(--oai-accent)" }}>
        {percent}%
      </span>
    </div>
  );
}

/* ── Item state helper ───────────────────────── */

function getItemState(item: OpenAIModuleItem, currentItemId: string): "complete" | "current" | "upcoming" {
  if (item.completed) return "complete";
  if (item.id === currentItemId) return "current";
  return "upcoming";
}

/* ── Course left nav ─────────────────────────── */

type ViewMode = "overview" | "item" | "xdp";

interface CourseNavProps {
  enrollments: OpenAIEnrollment[];
  selected: OpenAIEnrollment;
  viewMode: ViewMode;
  onSelect: (id: string) => void;
  onClose: () => void;
  onMyLearning: () => void;
  onSelectItem: (itemId: string) => void;
}

function CourseNav({ enrollments, selected, viewMode, onSelect, onClose, onMyLearning, onSelectItem }: CourseNavProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const currentModuleId = selected.currentModuleId;
  const [expandedModuleId, setExpandedModuleId] = useState<string>(currentModuleId);

  return (
    <div className="course-nav">
      <div className="course-nav-header">
        <span className="oai-body-sm" style={{ color: "var(--oai-text-tertiary)", flex: 1 }}>
          course navigation
        </span>
        <button className="chatgpt-sidebar-btn" onClick={onClose} aria-label="Close course view">
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
            close
          </span>
        </button>
      </div>

      {/* Course dropdown */}
      <div style={{ padding: "8px", position: "relative" }}>
        <button
          className="course-nav-dropdown"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 16, opacity: 0.5 }}>
            description
          </span>
          <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {selected.title}
          </span>
          <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
            {dropdownOpen ? "expand_less" : "expand_more"}
          </span>
        </button>

        {dropdownOpen && (
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: 8,
              right: 8,
              background: "var(--oai-bg)",
              border: "1px solid var(--oai-border)",
              borderRadius: "var(--oai-radius-md)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              zIndex: 10,
              overflow: "hidden",
            }}
          >
            {enrollments.map((e) => (
              <button
                key={e.id}
                className="course-nav-dropdown"
                style={{
                  background: e.id === selected.id ? "var(--oai-nav-item-active)" : "transparent",
                  borderRadius: 0,
                }}
                onClick={() => { onSelect(e.id); setDropdownOpen(false); }}
              >
                {e.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* My Learning link */}
      <div style={{ padding: "4px 8px" }}>
        <button
          className="course-nav-item"
          data-active={viewMode === "overview"}
          onClick={onMyLearning}
          style={{ fontWeight: viewMode === "overview" ? 500 : 400 }}
        >
          <span className="material-symbols-rounded" style={{ fontSize: 16, opacity: 0.6 }}>
            grid_view
          </span>
          <span>My Learning</span>
        </button>
      </div>

      {/* Module list with items */}
      <div className="course-nav-modules">
        {selected.modules.map((mod, mi) => {
          const isExpanded = mod.id === expandedModuleId;
          return (
            <div key={mod.id}>
              <button
                className="course-nav-module-header"
                style={{ width: "100%", background: "none", border: "none", cursor: "pointer", textAlign: "left", fontFamily: "var(--oai-font)" }}
                onClick={() => setExpandedModuleId(isExpanded ? "" : mod.id)}
              >
                Module {mi + 1}<br />{mod.title}
              </button>
              {isExpanded && mod.items.map((item) => {
                const state = getItemState(item, selected.currentItemId);
                return (
                  <button
                    key={item.id}
                    className="course-nav-item"
                    data-active={state === "current" && viewMode === "item"}
                    onClick={() => onSelectItem(item.id)}
                  >
                    <span className="course-nav-item-icon" data-state={state}>
                      {state === "complete" ? (
                        <span className="material-symbols-rounded" style={{ fontSize: 12 }}>check</span>
                      ) : state === "current" ? (
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#fff" }} />
                      ) : null}
                    </span>
                    <span className="flex flex-col">
                      <span>{item.title}</span>
                      <span className="course-nav-item-type">{item.type}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Daily goals ─────────────────────────────── */

function DailyGoals({ goals }: { goals: OpenAIDailyGoal[] }) {
  return (
    <div className="oai-card" style={{ padding: "24px 28px", width: "100%" }}>
      <h3 className="oai-heading-sm" style={{ marginTop: 0, marginBottom: 20 }}>Daily goals</h3>
      <ul className="flex flex-col" style={{ gap: 16, listStyle: "none", margin: 0, padding: 0 }}>
        {goals.map((g) => {
          const done = g.current >= g.target;
          return (
            <li key={g.id} className="flex items-center" style={{ gap: 14 }}>
              <span className="oai-goal-check material-symbols-rounded" data-done={done} style={{ fontSize: 14 }}>
                {done ? "check" : ""}
              </span>
              <span className="oai-body" style={{ color: done ? "var(--oai-text-tertiary)" : "var(--oai-text-primary)", textDecoration: done ? "line-through" : "none" }}>
                {g.label}
              </span>
              <span className="oai-label" style={{ marginLeft: "auto", color: "var(--oai-text-secondary)" }}>
                {g.current}/{g.target}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}


/* ── Weekly activity ────────────────────────── */

function OaiWeeklyActivityCard({ activity }: { activity: OpenAIWeeklyActivity }) {
  const isZero = activity.streakDays === 0 && activity.itemsCompleted === 0;
  return (
    <div className="oai-card" style={{ padding: "24px 28px", width: "100%" }}>
      <div className="flex items-center" style={{ gap: 12, marginBottom: 20 }}>
        <h3 className="oai-heading-sm" style={{ margin: 0 }}>Weekly activity</h3>
        {!isZero && (
          <span className="oai-streak-chip">
            <span className="material-symbols-rounded" style={{ fontSize: 12 }}>calendar_month</span>
            {activity.streakDays} day streak
          </span>
        )}
      </div>
      {isZero ? (
        <span className="oai-body" style={{ color: "var(--oai-text-secondary)" }}>
          Your weekly learning activity will show up here. Complete your first lesson to get started.
        </span>
      ) : (
        <>
          <div className="flex" style={{ gap: 8, marginBottom: 20 }}>
            {activity.days.map((d) => (
              <div key={d.label} className="oai-weekly-day" data-state={d.state}>
                {d.state === "done" ? (
                  <span className="material-symbols-rounded" style={{ fontSize: 16 }}>check</span>
                ) : (
                  d.label
                )}
              </div>
            ))}
          </div>
          <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
            {activity.itemsCompleted} items completed &middot; {activity.minutesLearned} minutes learned
          </span>
        </>
      )}
    </div>
  );
}

/* ── Certificate card ────────────────────────── */

function CertificateCard({ cert, onClick }: { cert: OpenAICertificate; onClick?: () => void }) {
  const parts = cert.courseTitle.split(" ");
  const midpoint = Math.ceil(parts.length / 2);
  const line1 = parts.slice(0, midpoint).join(" ");
  const line2 = parts.slice(midpoint).join(" ");

  return (
    <button
      className="oai-certificate-card"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
        ...(cert.cardBackground ? { background: cert.cardBackground } : {}),
      }}
    >
      <div className="oai-certificate-card-top">
        <span style={{ fontSize: 15, fontWeight: 500 }}>ChatGPT</span>
        <span style={{ fontSize: 15, fontWeight: 500, textAlign: "right", lineHeight: "20px" }}>
          {line1}<br />{line2}
        </span>
      </div>

      <div className="oai-certificate-logo-circle">
        <ChatGPTLogo size={72} />
      </div>

      <span style={{ fontSize: 15, fontWeight: 500, textAlign: "left" }}>OpenAI</span>
    </button>
  );
}

/* ── Item content player ─────────────────────── */

const ITEM_PLACEHOLDER_CONTENT: Record<OpenAIModuleItem["type"], { body: string; action: string }> = {
  Video: {
    body: "In this video lesson, you'll explore key concepts through guided instruction. Watch the full video, then proceed to the next item when you're ready.",
    action: "Play Video",
  },
  Reading: {
    body: "This reading covers foundational ideas that build on what you've learned so far. Take your time to absorb the material — you can revisit it anytime.\n\nKey topics include practical frameworks, real-world examples, and strategies you can apply immediately. Reflect on how these ideas connect to your own experience.",
    action: "Mark as Complete",
  },
  Practice: {
    body: "In this activity you will practice how to use ChatGPT in a realistic work situation.\n\nChoose a scenario\n\nChoose one of these prompts and adapt it to your job.\n\n1. Customer response scenario\n\"I work in customer support. A customer has written a long message about a billing error that might turn into a formal complaint. I want to use ChatGPT to help draft a response. Help me decide what parts are safe to handle with AI and what parts should be written or approved by a human.\"\n\n2. Internal policy scenario\n\"I am updating an internal how-to guide that involves handling confidential client information. I want to use ChatGPT to rewrite it for clarity. Help me decide which sections are appropriate to paste into ChatGPT and which should be redrafted manually without any sensitive details.\"\n\n3. Communication scenario\n\"I am writing a message to a team member about a repeated performance concern. I want to use ChatGPT to improve my wording. Help me decide how to use AI in a way that protects privacy and keeps judgment and final decisions with me.\"",
    action: "Start Role Play",
  },
  "Graded Assessment": {
    body: "This graded assessment will test your understanding of the concepts covered in this module. You'll answer a series of questions — take your time and apply what you've learned.\n\nYou can retake the assessment if needed.",
    action: "Start Assessment",
  },
};

function ItemPanel({
  enrollment,
  onBack,
}: {
  enrollment: OpenAIEnrollment;
  onBack: () => void;
}) {
  const allItems = enrollment.modules.flatMap((m) =>
    m.items.map((item) => ({ ...item, moduleTitle: m.title }))
  );
  const currentIdx = allItems.findIndex((i) => i.id === enrollment.currentItemId);
  const [activeIdx, setActiveIdx] = useState(currentIdx >= 0 ? currentIdx : 0);
  const item = allItems[activeIdx];

  if (!item) return null;

  const content = ITEM_PLACEHOLDER_CONTENT[item.type];
  const hasPrev = activeIdx > 0;
  const hasNext = activeIdx < allItems.length - 1;

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 28px", flexShrink: 0 }}
      >
        <div className="flex items-center" style={{ gap: 10 }}>
          <button className="chatgpt-sidebar-btn" aria-label="Copy">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>content_copy</span>
          </button>
          <button className="chatgpt-sidebar-btn" aria-label="Settings">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>settings</span>
          </button>
        </div>
        <div className="flex items-center" style={{ gap: 10 }}>
          <button onClick={onBack} className="oai-coursera-btn">
            <svg viewBox="0 0 1155 164" width="80" height="11" fill="currentColor" aria-hidden>
              <path d={COURSERA_SVG_PATH} fillRule="nonzero" />
            </svg>
            Open in Coursera
          </button>
          <button className="chatgpt-sidebar-btn" aria-label="Help">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>help_outline</span>
          </button>
        </div>
      </div>

      {/* Scrollable content with prev/next arrows */}
      <main className="flex-1 overflow-y-auto relative" style={{ padding: "0 48px 40px" }}>
        {/* Prev arrow */}
        {hasPrev && (
          <button
            onClick={() => setActiveIdx(activeIdx - 1)}
            className="chatgpt-sidebar-btn"
            aria-label="Previous item"
            style={{ position: "fixed", left: 320, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 24 }}>arrow_back</span>
          </button>
        )}
        {/* Next arrow */}
        {hasNext && (
          <button
            onClick={() => setActiveIdx(activeIdx + 1)}
            className="chatgpt-sidebar-btn"
            aria-label="Next item"
            style={{ position: "fixed", right: 24, top: "50%", transform: "translateY(-50%)", zIndex: 2 }}
          >
            <span className="material-symbols-rounded" style={{ fontSize: 24 }}>arrow_forward</span>
          </button>
        )}

        <div className="flex flex-col" style={{ maxWidth: 720, gap: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 500, lineHeight: "36px", margin: 0 }}>
            {item.title}
          </h1>
          <p className="oai-body" style={{ color: "var(--oai-text-secondary)", margin: 0 }}>
            {item.type} &middot; {item.moduleTitle}
          </p>

          <div style={{ whiteSpace: "pre-line" }}>
            <p className="oai-body" style={{ color: "var(--oai-text-primary)", margin: 0, lineHeight: "24px" }}>
              {content.body}
            </p>
          </div>

          <button className="oai-btn-primary" style={{ alignSelf: "flex-start", marginTop: 8 }}>
            {content.action}
          </button>
        </div>
      </main>

      {/* Bottom input */}
      <div style={{ padding: "0 28px 14px", flexShrink: 0 }}>
        <div className="chatgpt-input-bar" style={{ maxWidth: 720 }}>
          <button className="chatgpt-input-icon" aria-label="Attach">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>add</span>
          </button>
          <input type="text" placeholder="Ask about the course" readOnly />
          <button className="chatgpt-input-icon" aria-label="Voice input">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>mic</span>
          </button>
          <button className="chatgpt-input-icon" aria-label="Audio">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>graphic_eq</span>
          </button>
        </div>
        <div className="chatgpt-disclaimer" style={{ maxWidth: 720, textAlign: "center" }}>
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}

/* ── XDP (Experience Detail Page) ────────────── */

function XdpPanel({
  enrollment,
  locked = false,
  onGoToCourse,
  onBack,
}: {
  enrollment: OpenAIEnrollment;
  locked?: boolean;
  onGoToCourse: (id: string) => void;
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 28px", flexShrink: 0 }}
      >
        <div className="flex items-center" style={{ gap: 10 }}>
          <button className="chatgpt-sidebar-btn" aria-label="Settings">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>settings</span>
          </button>
        </div>
        <div className="flex items-center" style={{ gap: 10 }}>
          <button onClick={onBack} className="oai-coursera-btn">
            <svg viewBox="0 0 1155 164" width="80" height="11" fill="currentColor" aria-hidden>
              <path d={COURSERA_SVG_PATH} fillRule="nonzero" />
            </svg>
            Open in Coursera
          </button>
          <button className="chatgpt-sidebar-btn" aria-label="Help">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>help_outline</span>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto" style={{ padding: "0 48px 40px" }}>
        <div className="flex flex-col" style={{ maxWidth: 960, gap: 16 }}>

          {/* Hero + Module list side-by-side */}
          <div style={{ display: "flex", gap: 28, alignItems: "flex-start" }}>
            {/* Hero */}
            <div
              className="oai-xdp-hero"
              style={{
                flex: 1,
                minWidth: 0,
                ...(enrollment.brandSurfaceTint ? { background: enrollment.brandSurfaceTint } : {}),
              }}
            >
              <span style={{ fontSize: 22, fontWeight: 500, lineHeight: "28px" }}>OpenAI</span>
              <h1 style={{ fontSize: 32, fontWeight: 500, lineHeight: "40px", margin: 0, marginTop: 8 }}>
                {enrollment.title}
              </h1>
              <span className="oai-body" style={{ color: "var(--oai-text-secondary)" }}>
                {enrollment.level} &middot; {enrollment.estimatedHours} hours
              </span>
              <div className="flex items-center" style={{ gap: 14, marginTop: 8 }}>
                <button
                  className="oai-btn-primary"
                  style={{ alignSelf: "flex-start", opacity: locked ? 0.6 : 1 }}
                  onClick={locked ? undefined : () => onGoToCourse(enrollment.id)}
                  disabled={locked}
                >
                  {enrollment.status === "Not started" && !locked ? "Start learning" : "Go to course"}
                </button>
                {enrollment.status === "Complete" && (
                  <button
                    className="oai-btn-secondary"
                    style={{ alignSelf: "flex-start" }}
                    onClick={() => {}}
                  >
                    View certification
                  </button>
                )}
                {locked && (
                  <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
                    Complete previous courses to unlock
                  </span>
                )}
              </div>
            </div>

            {/* Module list card */}
            <div className="oai-xdp-modules-card">
              <h3 className="oai-heading-sm" style={{ marginBottom: 20 }}>
                {enrollment.modules.length} modules in this course
              </h3>
              {enrollment.modules.map((mod, mi) => (
                <div key={mod.id} className="oai-xdp-module-row">
                  <span className="oai-label" style={{ color: "var(--oai-text-tertiary)" }}>
                    Module {mi + 1}{mod.durationMin ? ` \u2022 ${mod.durationMin} min` : ""}
                  </span>
                  <span className="oai-body-sm">{mod.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* What you will learn */}
          {enrollment.learningOutcomes.length > 0 && (
            <div>
              <h2 className="oai-heading-sm" style={{ marginBottom: 20 }}>What you will learn:</h2>
              <div className="oai-xdp-outcomes-grid">
                {enrollment.learningOutcomes.map((outcome, i) => (
                  <div key={i} className="oai-xdp-outcome">
                    <span className="oai-xdp-outcome-check">
                      <span className="material-symbols-rounded" style={{ fontSize: 20 }}>check</span>
                    </span>
                    <span className="oai-body" style={{ color: "var(--oai-text-primary)" }}>
                      {outcome}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills you'll gain */}
          {enrollment.skillTags.length > 0 && (
            <div>
              <h2 className="oai-heading-sm" style={{ marginBottom: 8 }}>Skills you'll gain</h2>
              <p className="oai-body" style={{ color: "var(--oai-text-secondary)", margin: 0 }}>
                {enrollment.skillTags.join(", ")}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Bottom input */}
      <div style={{ padding: "0 28px 14px", flexShrink: 0 }}>
        <div className="chatgpt-input-bar" style={{ maxWidth: 960 }}>
          <button className="chatgpt-input-icon" aria-label="Attach">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>add</span>
          </button>
          <input type="text" placeholder="Ask about the course" readOnly />
          <button className="chatgpt-input-icon" aria-label="Voice input">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>mic</span>
          </button>
          <button className="chatgpt-input-icon" aria-label="Audio">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>graphic_eq</span>
          </button>
        </div>
        <div className="chatgpt-disclaimer" style={{ maxWidth: 960, textAlign: "center" }}>
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}

/* ── Coursera wordmark SVG path (for back button) ── */

const COURSERA_SVG_PATH = "M159.75 81.54c0-44.49 36.63-80.47 82.43-80.47 46.12 0 82.76 36 82.76 80.47 0 44.16-36.64 80.8-82.76 80.8-45.8 0-82.43-36.68-82.43-80.8zm125.61 0c0-22.24-19.3-41.87-43.18-41.87-23.55 0-42.85 19.63-42.85 41.87 0 22.57 19.3 42.2 42.85 42.2 23.92 0 43.18-19.63 43.18-42.2zm705.63 1.31c0-48.74 39.58-81.78 75.57-81.78 24.53 0 38.6 7.52 48.08 21.92l3.77-19h36.79v155.4h-36.79l-4.75-16c-10.79 11.78-24.21 19-47.1 19-35.33-.05-75.57-31.13-75.57-79.54zm125.61-.33c-.09-23.527-19.47-42.835-43-42.835-23.59 0-43 19.411-43 43v.165c0 21.59 19.3 40.89 42.86 40.89 23.85 0 43.14-19.3 43.14-41.22zM945.78 22V4h-40.23v155.39h40.23V75.66c0-25.19 12.44-38.27 34-38.27 1.43 0 2.79.1 4.12.23L991.36.11c-20.97.11-36.17 7.3-45.58 21.89zm-404.27.01v-18l-40.23.09.34 155.37 40.23-.09-.22-83.72c-.06-25.18 12.35-38.29 33.93-38.34 1.376.004 2.752.081 4.12.23L587.1 0c-21 .17-36.22 7.39-45.59 22.01zM338.88 99.2V4.01h40.22V94.3c0 19.95 11.12 31.73 30.42 31.73 21.59 0 34-13.09 34-38.28V4.01h40.24v155.38h-40.21v-18c-9.48 14.72-24.86 21.92-46.12 21.92-35.98.01-58.55-26.16-58.55-64.11zm391.74-17.48c.09-43.51 31.23-80.74 80.62-80.65 45.8.09 78.11 36.78 78 80 .01 4.273-.33 8.54-1 12.76l-118.41-.22c4.54 18.65 19.89 32.09 43.12 32.14 14.06 0 29.12-5.18 38.3-16.94l27.44 22c-14.11 19.93-39 31.66-65.48 31.61-46.75-.16-82.67-35.23-82.59-80.7zm118.12-16.14c-2.26-15.7-18.59-27.84-37.89-27.87-18.65 0-33.71 11.06-39.63 27.73l77.52.14zm-261.4 59.94l35.76-18.72c5.91 12.81 17.73 20.36 34.48 20.36 15.43 0 21.34-4.92 21.34-11.82 0-25-84.71-9.85-84.71-67 0-31.52 27.58-48.26 61.72-48.26 25.94 0 48.92 11.49 61.4 32.83l-35.44 18.75c-5.25-10.51-15.1-16.42-27.58-16.42-12.14 0-18.06 4.27-18.06 11.49 0 24.3 84.71 8.87 84.71 67 0 30.21-24.62 48.59-64.35 48.59-33.82-.03-57.46-11.19-69.27-36.8zM0 81.54C0 36.73 36.63.74 82.43.74c27.947-.196 54.182 13.737 69.67 37l-34.34 19.92a42.972 42.972 0 00-35.33-18.32c-23.55 0-42.85 19.63-42.85 42.2 0 22.57 19.3 42.2 42.85 42.2a42.502 42.502 0 0036.31-20l34 20.28c-15.307 23.955-41.902 38.431-70.33 38.28C36.63 162.34 0 125.66 0 81.54z";

/* ── Main content panel ──────────────────────── */

function MainPanel({
  enrollment,
  enrollments,
  goals,
  weeklyActivity,
  certificates,
  onResume,
  onBack,
  onSelectCourse,
}: {
  enrollment: OpenAIEnrollment;
  enrollments: OpenAIEnrollment[];
  goals: OpenAIDailyGoal[];
  weeklyActivity: OpenAIWeeklyActivity;
  certificates: OpenAICertificate[];
  onResume: (id: string) => void;
  onBack: () => void;
  onSelectCourse: (id: string) => void;
}) {
  const currentModule = enrollment.modules.find((m) => m.id === enrollment.currentModuleId);
  const firstIncomplete = isFirstIncompleteCourse(enrollment, enrollments);

  return (
    <div className="flex flex-col flex-1 min-w-0 h-full">
      {/* Top bar */}
      <div
        className="flex items-center justify-between"
        style={{ padding: "14px 28px", flexShrink: 0 }}
      >
        <div className="flex items-center" style={{ gap: 10 }}>
          <button className="chatgpt-sidebar-btn" aria-label="Copy">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>content_copy</span>
          </button>
          <button className="chatgpt-sidebar-btn" aria-label="Settings">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>settings</span>
          </button>
        </div>
        <div className="flex items-center" style={{ gap: 10 }}>
          <button onClick={onBack} className="oai-coursera-btn">
            <svg viewBox="0 0 1155 164" width="80" height="11" fill="currentColor" aria-hidden>
              <path d={COURSERA_SVG_PATH} fillRule="nonzero" />
            </svg>
            Open in Coursera
          </button>
          <button className="chatgpt-sidebar-btn" aria-label="Help">
            <span className="material-symbols-rounded" style={{ fontSize: 18 }}>help_outline</span>
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <main className="flex-1 overflow-y-auto" style={{ padding: "16px 48px 40px" }}>
        <div className="flex flex-col" style={{ maxWidth: 960, gap: 16 }}>
          {/* Header */}
          <div className="flex items-center" style={{ gap: 24 }}>
            <OaiProgressRing percent={enrollment.progressPercent} size={80} />
            <div className="flex flex-col" style={{ gap: 10 }}>
              <h1 className="oai-heading-lg" style={{ margin: 0 }}>{enrollment.title}</h1>
              <p className="oai-body" style={{ color: "var(--oai-text-secondary)", margin: 0 }}>
                {enrollment.shortDescription}
              </p>
            </div>
          </div>

          {/* Resume / get started / locked (sequential path) */}
          {currentModule && enrollment.status === "In progress" && (
            <div className="oai-card flex items-center justify-between" style={{ padding: "20px 28px" }}>
              <div className="flex flex-col" style={{ gap: 4 }}>
                <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
                  Pick up where you left off
                </span>
                <span className="oai-heading-sm">{enrollment.currentItemTitle}</span>
                <span className="oai-body-sm" style={{ color: "var(--oai-text-tertiary)" }}>
                  {currentModule.title}
                </span>
              </div>
              <button className="oai-btn-primary" onClick={() => onResume(enrollment.id)}>
                Resume
              </button>
            </div>
          )}
          {enrollment.status === "Not started" && firstIncomplete && (
            <div className="oai-card flex items-center justify-between" style={{ padding: "20px 28px" }}>
              <div className="flex flex-col" style={{ gap: 4 }}>
                <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
                  Start your learning journey
                </span>
                <span className="oai-heading-sm">{enrollment.title}</span>
                <span className="oai-body-sm" style={{ color: "var(--oai-text-tertiary)" }}>
                  {enrollment.modules.length} modules &middot; ~{enrollment.estimatedHours} hours
                </span>
              </div>
              <button className="oai-btn-primary" onClick={() => onSelectCourse(enrollment.id)}>
                Start learning
              </button>
            </div>
          )}
          {enrollment.status === "Not started" && !firstIncomplete && (
            <div className="oai-card" style={{ padding: "20px 28px" }}>
              <span className="oai-body-sm" style={{ color: "var(--oai-text-secondary)" }}>
                Complete previous courses in your path to unlock this course.
              </span>
            </div>
          )}

          {/* Daily Goals + Weekly Activity */}
          <div style={{ display: "flex", gap: 16, alignItems: "stretch" }}>
            <DailyGoals goals={goals} />
            <OaiWeeklyActivityCard activity={weeklyActivity} />
          </div>

          {/* Certifications earned */}
          {certificates.length > 0 && (
            <div>
              <h3 className="oai-heading-sm" style={{ marginBottom: 20 }}>Certifications earned</h3>
              <div className="oai-certificates-row">
                {certificates.map((c) => {
                  const match = enrollments.find((e) => e.title === c.courseTitle);
                  return (
                    <CertificateCard
                      key={c.id}
                      cert={c}
                      onClick={match ? () => onSelectCourse(match.id) : undefined}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Bottom input */}
      <div style={{ padding: "0 28px 14px", flexShrink: 0 }}>
        <div className="chatgpt-input-bar" style={{ maxWidth: 960 }}>
          <button className="chatgpt-input-icon" aria-label="Attach">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>add</span>
          </button>
          <input type="text" placeholder="Ask about the course" readOnly />
          <button className="chatgpt-input-icon" aria-label="Voice input">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>mic</span>
          </button>
          <button className="chatgpt-input-icon" aria-label="Audio">
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>graphic_eq</span>
          </button>
        </div>
        <div className="chatgpt-disclaimer" style={{ maxWidth: 960, textAlign: "center" }}>
          ChatGPT can make mistakes. Check important info.
        </div>
      </div>
    </div>
  );
}

/* ── Full-screen shell ───────────────────────── */

interface MyLearningFullScreenProps {
  enrollments: OpenAIEnrollment[];
  dailyGoals: OpenAIDailyGoal[];
  weeklyActivity: OpenAIWeeklyActivity;
  certificates: OpenAICertificate[];
  initialCourseId?: string;
  initialViewMode?: ViewMode;
  onClose: () => void;
  onBack: () => void;
}

export function MyLearningFullScreen({
  enrollments,
  dailyGoals,
  weeklyActivity,
  certificates,
  initialCourseId,
  initialViewMode = "overview",
  onClose,
  onBack,
}: MyLearningFullScreenProps) {
  const [selectedId, setSelectedId] = useState(initialCourseId ?? enrollments[0]?.id ?? "");
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const selected = enrollments.find((e) => e.id === selectedId) ?? enrollments[0];

  if (!selected) return null;

  function handleSelectCourse(courseId: string) {
    if (courseId === selectedId) {
      setViewMode("xdp");
      return;
    }
    const course = enrollments.find((e) => e.id === courseId);
    setSelectedId(courseId);
    setViewMode(course?.status === "In progress" ? "item" : "xdp");
  }

  function handleGoToCourse(courseId: string) {
    setSelectedId(courseId);
    setViewMode("item");
  }

  function handleViewXdp(courseId: string) {
    setSelectedId(courseId);
    setViewMode("xdp");
  }

  function handleSelectItem(_itemId: string) {
    setViewMode("item");
  }

  function renderMainContent() {
    if (viewMode === "xdp") {
      return (
        <XdpPanel
          enrollment={selected}
          locked={isNotStartedCourseLocked(selected, enrollments)}
          onGoToCourse={handleGoToCourse}
          onBack={onBack}
        />
      );
    }
    if (viewMode === "item") {
      return (
        <ItemPanel
          key={selected.id}
          enrollment={selected}
          onBack={onBack}
        />
      );
    }
    return (
      <MainPanel
        enrollment={selected}
        enrollments={enrollments}
        goals={dailyGoals}
        weeklyActivity={weeklyActivity}
        certificates={certificates}
        onResume={() => setViewMode("item")}
        onBack={onBack}
        onSelectCourse={handleViewXdp}
      />
    );
  }

  return (
    <div className="openai-shell" style={{ display: "flex", height: "100vh", width: "100%", background: "var(--oai-bg)" }}>
      {/* Narrow ChatGPT sidebar */}
      <div className="chatgpt-sidebar">
        <button className="chatgpt-sidebar-btn" style={{ color: "var(--oai-text-primary)" }}>
          <ChatGPTLogo size={20} />
        </button>
      </div>

      {/* Course navigation — always visible */}
      <CourseNav
        enrollments={enrollments}
        selected={selected}
        viewMode={viewMode}
        onSelect={handleSelectCourse}
        onClose={onClose}
        onMyLearning={() => {
          const inProgress = enrollments.find((e) => e.status === "In progress");
          if (inProgress) {
            setSelectedId(inProgress.id);
          } else {
            const first = getFirstIncompleteCourse(enrollments);
            if (first) setSelectedId(first.id);
          }
          setViewMode("overview");
        }}
        onSelectItem={handleSelectItem}
      />

      {/* Main content */}
      {renderMainContent()}
    </div>
  );
}
