import { CourseraLogo } from "./CourseraLogo";

interface NavBarProps {
  onMyLearning?: () => void;
}

export function NavBar({ onMyLearning }: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-grey-100">
      {/* ── Mobile nav (below md) ── */}
      <div className="md:hidden flex items-center justify-between px-20 py-16 h-68">
        <div className="flex items-center gap-12">
          <button
            aria-label="Open menu"
            className="flex items-center justify-center size-20 text-grey-975 flex-shrink-0"
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
              menu
            </span>
          </button>
          <CourseraLogo width={106} height={15} />
        </div>
        <button className="flex items-center justify-center px-12 py-4 border border-blue-700 text-blue-700 bg-white rounded-8 cds-action-secondary hover:bg-blue-25 transition-colors duration-fast">
          Join for free
        </button>
      </div>

      {/* ── Desktop nav (md and above) ── */}
      <div className="hidden md:flex items-center justify-between h-64 px-48 max-w-[1440px] mx-auto">
        {/* Left group: logo + nav links + search */}
        <div className="flex items-center gap-8">
          <CourseraLogo width={113} height={16} />

          {/* Nav links */}
          <div className="flex items-center">
            <button className="flex items-center gap-4 px-12 py-8 cds-action-secondary text-grey-975 hover:bg-grey-25 rounded-8 transition-colors duration-fast">
              Explore
              <span className="material-symbols-rounded" style={{ fontSize: 16 }}>
                expand_more
              </span>
            </button>
            <button className="px-12 py-8 cds-action-secondary text-grey-975 hover:bg-grey-25 rounded-8 transition-colors duration-fast">
              My Learning
            </button>
            <button className="px-12 py-8 cds-action-secondary text-grey-975 hover:bg-grey-25 rounded-8 transition-colors duration-fast">
              Degrees
            </button>
          </div>

          {/* Search input */}
          <div className="relative flex items-center h-44 w-[480px] bg-white border border-grey-100 rounded-full overflow-hidden">
            <span className="flex-1 pl-16 pr-40 cds-body-secondary text-grey-600 whitespace-nowrap overflow-hidden text-ellipsis pointer-events-none select-none">
              What do you want to learn?
            </span>
            <button
              aria-label="Search"
              className="absolute right-6 flex items-center justify-center size-32 bg-blue-700 rounded-full hover:bg-blue-800 transition-colors duration-fast flex-shrink-0"
            >
              <span className="material-symbols-rounded text-white" style={{ fontSize: 20 }}>
                search
              </span>
            </button>
          </div>
        </div>

        {/* Right group: icon buttons */}
        <div className="flex items-center gap-8">
          <button
            onClick={onMyLearning}
            className="flex items-center gap-8 px-12 py-8 rounded-8 transition-colors duration-fast hover:opacity-90"
            style={{ background: "#0d0d0d", color: "#fff", fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', fontSize: 14, fontWeight: 600, lineHeight: "20px" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872v.024zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66v.018zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681l-.004 6.722zm1.097-2.365l2.602-1.5 2.607 1.5v3.005l-2.607 1.5-2.602-1.5V10.5z" fill="currentColor"/>
            </svg>
            Open in ChatGPT
          </button>
          <button
            aria-label="Language"
            className="flex items-center justify-center size-40 rounded-full hover:bg-grey-25 text-grey-975 transition-colors duration-fast"
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
              language
            </span>
          </button>
          <button
            aria-label="Notifications"
            className="flex items-center justify-center size-40 rounded-full hover:bg-grey-25 text-grey-975 transition-colors duration-fast"
          >
            <span className="material-symbols-rounded" style={{ fontSize: 20 }}>
              notifications
            </span>
          </button>
          <button
            aria-label="Profile"
            className="flex items-center justify-center size-40 rounded-full bg-blue-700 text-white cds-subtitle-sm"
          >
            N
          </button>
        </div>
      </div>
    </nav>
  );
}
