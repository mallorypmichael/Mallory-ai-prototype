import type { OpenAIEnrollment } from "../../data/mockData";
import { MyLearningLight } from "./MyLearningLight";

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

interface ChatGPTPageProps {
  enrollments: OpenAIEnrollment[];
  firstTimeLearnerView: boolean;
  onFirstTimeLearnerViewChange: (value: boolean) => void;
  onBack: () => void;
  onExpandCourse: (id: string) => void;
  onResumeCourse: (id: string) => void;
}

export function ChatGPTPage({
  enrollments,
  firstTimeLearnerView,
  onFirstTimeLearnerViewChange,
  onBack,
  onExpandCourse,
  onResumeCourse,
}: ChatGPTPageProps) {
  return (
    <div className="openai-shell chatgpt-page">
      {/* Left icon sidebar */}
      <div className="chatgpt-sidebar">
        <button className="chatgpt-sidebar-btn" style={{ color: "var(--oai-text-primary)" }}>
          <ChatGPTLogo size={20} />
        </button>
        <button className="chatgpt-sidebar-btn" aria-label="New chat">
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
            edit_square
          </span>
        </button>
        <button className="chatgpt-sidebar-btn" aria-label="Search">
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
            search
          </span>
        </button>
        <button className="chatgpt-sidebar-btn" aria-label="Projects">
          <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
            folder
          </span>
        </button>

      </div>

      {/* Main chat area */}
      <div className="chatgpt-main">
        {/* Top bar */}
        <div className="chatgpt-topbar">
          <button className="chatgpt-topbar-model">
            ChatGPT 5
            <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
              expand_more
            </span>
          </button>
          <div className="chatgpt-topbar-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              type="button"
              role="switch"
              aria-checked={firstTimeLearnerView}
              onClick={() => onFirstTimeLearnerViewChange(!firstTimeLearnerView)}
              className="oai-body-sm"
              style={{
                padding: "8px 12px",
                border: "1px solid var(--oai-border)",
                borderRadius: "var(--oai-radius-sm)",
                background: firstTimeLearnerView ? "var(--oai-bg-tertiary)" : "transparent",
                color: "var(--oai-text-primary)",
                cursor: "pointer",
                fontFamily: "var(--oai-font)",
              }}
            >
              First-time learner view
            </button>
            <button
              onClick={onBack}
              className="oai-coursera-btn"
            >
              <svg viewBox="0 0 1155 164" width="80" height="11" fill="currentColor" aria-hidden>
                <path d="M159.75 81.54c0-44.49 36.63-80.47 82.43-80.47 46.12 0 82.76 36 82.76 80.47 0 44.16-36.64 80.8-82.76 80.8-45.8 0-82.43-36.68-82.43-80.8zm125.61 0c0-22.24-19.3-41.87-43.18-41.87-23.55 0-42.85 19.63-42.85 41.87 0 22.57 19.3 42.2 42.85 42.2 23.92 0 43.18-19.63 43.18-42.2zm705.63 1.31c0-48.74 39.58-81.78 75.57-81.78 24.53 0 38.6 7.52 48.08 21.92l3.77-19h36.79v155.4h-36.79l-4.75-16c-10.79 11.78-24.21 19-47.1 19-35.33-.05-75.57-31.13-75.57-79.54zm125.61-.33c-.09-23.527-19.47-42.835-43-42.835-23.59 0-43 19.411-43 43v.165c0 21.59 19.3 40.89 42.86 40.89 23.85 0 43.14-19.3 43.14-41.22zM945.78 22V4h-40.23v155.39h40.23V75.66c0-25.19 12.44-38.27 34-38.27 1.43 0 2.79.1 4.12.23L991.36.11c-20.97.11-36.17 7.3-45.58 21.89zm-404.27.01v-18l-40.23.09.34 155.37 40.23-.09-.22-83.72c-.06-25.18 12.35-38.29 33.93-38.34 1.376.004 2.752.081 4.12.23L587.1 0c-21 .17-36.22 7.39-45.59 22.01zM338.88 99.2V4.01h40.22V94.3c0 19.95 11.12 31.73 30.42 31.73 21.59 0 34-13.09 34-38.28V4.01h40.24v155.38h-40.21v-18c-9.48 14.72-24.86 21.92-46.12 21.92-35.98.01-58.55-26.16-58.55-64.11zm391.74-17.48c.09-43.51 31.23-80.74 80.62-80.65 45.8.09 78.11 36.78 78 80 .01 4.273-.33 8.54-1 12.76l-118.41-.22c4.54 18.65 19.89 32.09 43.12 32.14 14.06 0 29.12-5.18 38.3-16.94l27.44 22c-14.11 19.93-39 31.66-65.48 31.61-46.75-.16-82.67-35.23-82.59-80.7zm118.12-16.14c-2.26-15.7-18.59-27.84-37.89-27.87-18.65 0-33.71 11.06-39.63 27.73l77.52.14zm-261.4 59.94l35.76-18.72c5.91 12.81 17.73 20.36 34.48 20.36 15.43 0 21.34-4.92 21.34-11.82 0-25-84.71-9.85-84.71-67 0-31.52 27.58-48.26 61.72-48.26 25.94 0 48.92 11.49 61.4 32.83l-35.44 18.75c-5.25-10.51-15.1-16.42-27.58-16.42-12.14 0-18.06 4.27-18.06 11.49 0 24.3 84.71 8.87 84.71 67 0 30.21-24.62 48.59-64.35 48.59-33.82-.03-57.46-11.19-69.27-36.8zM0 81.54C0 36.73 36.63.74 82.43.74c27.947-.196 54.182 13.737 69.67 37l-34.34 19.92a42.972 42.972 0 00-35.33-18.32c-23.55 0-42.85 19.63-42.85 42.2 0 22.57 19.3 42.2 42.85 42.2a42.502 42.502 0 0036.31-20l34 20.28c-15.307 23.955-41.902 38.431-70.33 38.28C36.63 162.34 0 125.66 0 81.54z" fillRule="nonzero"/>
              </svg>
              Open in Coursera
            </button>
            <button className="chatgpt-sidebar-btn" aria-label="Share">
              <span className="material-symbols-rounded" style={{ fontSize: 18 }}>
                share
              </span>
            </button>
            <button className="chatgpt-sidebar-btn" aria-label="More options">
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                more_horiz
              </span>
            </button>
          </div>
        </div>

        {/* Chat messages */}
        <div className="chatgpt-chat-area">
          <div className="chatgpt-chat-content">
            {/* User message */}
            <div className="chatgpt-user-bubble">
              Can you show me OpenAI Certified courses
            </div>

            {/* Assistant response */}
            <div className="chatgpt-assistant-row">
              <div className="chatgpt-assistant-icon">
                <ChatGPTLogo size={14} />
              </div>
              <div className="chatgpt-assistant-content">
                <p className="chatgpt-assistant-text" style={{ margin: 0 }}>
                  {firstTimeLearnerView
                    ? "Here's how to get started with your OpenAI Certified program"
                    : "Here's where you left off in your OpenAI Certified program"}
                </p>
                <MyLearningLight
                  enrollments={enrollments}
                  onExpand={onExpandCourse}
                  onResume={onResumeCourse}
                  onViewDetails={onExpandCourse}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Input bar */}
        <div className="chatgpt-input-area">
          <div className="chatgpt-input-bar">
            <button className="chatgpt-input-icon" aria-label="Attach">
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                add
              </span>
            </button>
            <input type="text" placeholder="Ask anything" readOnly />
            <button className="chatgpt-input-icon" aria-label="Voice input">
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                mic
              </span>
            </button>
            <button className="chatgpt-input-icon" aria-label="Audio">
              <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
                graphic_eq
              </span>
            </button>
          </div>
          <div className="chatgpt-disclaimer">
            ChatGPT can make mistakes. Check important info.
          </div>
        </div>
      </div>
    </div>
  );
}
