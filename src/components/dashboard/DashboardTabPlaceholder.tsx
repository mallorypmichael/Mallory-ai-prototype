import type { DashboardTabId } from "./DashboardTabs";

const PLACEHOLDER_COPY: Record<Exclude<DashboardTabId, "overview">, { heading: string; body: string }> = {
  skills: {
    heading: "Skills",
    body: "Your skills and recommendations for this dashboard will appear here.",
  },
  inProgress: {
    heading: "In progress",
    body: "Courses and items you’re actively working on will appear here.",
  },
  saved: {
    heading: "Saved",
    body: "Saved courses and lists will appear here.",
  },
  certificates: {
    heading: "Certificates",
    body: "Earned certificates and credentials will appear here.",
  },
};

interface DashboardTabPlaceholderProps {
  tabId: Exclude<DashboardTabId, "overview">;
}

export function DashboardTabPlaceholder({ tabId }: DashboardTabPlaceholderProps) {
  const { heading, body } = PLACEHOLDER_COPY[tabId];
  return (
    <div className="py-24">
      <h2 className="cds-subtitle-md text-grey-975 mb-8">{heading}</h2>
      <p className="cds-body-primary text-grey-600">{body}</p>
    </div>
  );
}
