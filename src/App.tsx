import { useState } from "react";
import { NavBar } from "./components/NavBar";
import { ProgressBanner } from "./components/ProgressBanner";
import { DashboardTabs, type DashboardTabId } from "./components/dashboard/DashboardTabs";
import { DashboardTabPlaceholder } from "./components/dashboard/DashboardTabPlaceholder";
import { SkillProgressGrid } from "./components/dashboard/SkillProgressGrid";
import { LearningCalendarCard } from "./components/dashboard/LearningCalendarCard";
import { AiInsightBanner } from "./components/dashboard/AiInsightBanner";
import { RecentCertificates } from "./components/dashboard/RecentCertificates";
import { ChatGPTPage } from "./components/my-learning/ChatGPTPage";
import { MyLearningFullScreen } from "./components/my-learning/MyLearningFullScreen";
import {
  progressBannerData,
  overviewSkillProgress,
  recentCertificates,
  openAIEnrollments,
  openAIEnrollmentsFtux,
  openAIEnrollmentsComplete,
  openAIDailyGoals,
  openAIDailyGoalsFtux,
  openAIDailyGoalsComplete,
  openAIWeeklyActivity,
  openAIWeeklyActivityFtux,
  openAIWeeklyActivityComplete,
  openAICertificates,
  openAICertificatesFtux,
  openAICertificatesComplete,
} from "./data/mockData";

type AppView = "dashboard" | "chatgpt" | "fullCourse";

function renderDashboardContent(tab: DashboardTabId) {
  if (tab === "overview") {
    return (
      <div className="flex flex-col lg:flex-row gap-32 items-start">
        <div className="flex flex-col gap-24 flex-1 min-w-0 w-full">
          <SkillProgressGrid skills={overviewSkillProgress} />
          <AiInsightBanner />
          <RecentCertificates items={recentCertificates} />
        </div>
        <LearningCalendarCard />
      </div>
    );
  }

  return <DashboardTabPlaceholder tabId={tab} />;
}

export default function App() {
  const [view, setView] = useState<AppView>("dashboard");
  const [dashboardTab, setDashboardTab] = useState<DashboardTabId>("overview");
  const [selectedCourseId, setSelectedCourseId] = useState<string | undefined>();
  const [initialViewMode, setInitialViewMode] = useState<"overview" | "item" | "xdp">("overview");
  type DemoState = "default" | "ftux" | "complete";
  const [demoState, setDemoState] = useState<DemoState>("default");

  const myLearningEnrollments = demoState === "ftux" ? openAIEnrollmentsFtux : demoState === "complete" ? openAIEnrollmentsComplete : openAIEnrollments;
  const myLearningDailyGoals = demoState === "ftux" ? openAIDailyGoalsFtux : demoState === "complete" ? openAIDailyGoalsComplete : openAIDailyGoals;
  const myLearningWeekly = demoState === "ftux" ? openAIWeeklyActivityFtux : demoState === "complete" ? openAIWeeklyActivityComplete : openAIWeeklyActivity;
  const myLearningCertificates = demoState === "ftux" ? openAICertificatesFtux : demoState === "complete" ? openAICertificatesComplete : openAICertificates;

  function goToFullCourse(courseId: string, mode: "overview" | "item" | "xdp" = "overview") {
    setSelectedCourseId(courseId);
    setInitialViewMode(mode);
    setView("fullCourse");
  }

  if (view === "chatgpt") {
    return (
      <ChatGPTPage
        enrollments={myLearningEnrollments}
        demoState={demoState}
        onDemoStateChange={setDemoState}
        onBack={() => setView("dashboard")}
        onExpandCourse={(id) => goToFullCourse(id, "xdp")}
        onResumeCourse={(id) => goToFullCourse(id, "item")}
      />
    );
  }

  if (view === "fullCourse") {
    return (
      <MyLearningFullScreen
        enrollments={myLearningEnrollments}
        dailyGoals={myLearningDailyGoals}
        weeklyActivity={myLearningWeekly}
        certificates={myLearningCertificates}
        initialCourseId={selectedCourseId}
        initialViewMode={initialViewMode}
        onClose={() => setView("chatgpt")}
        onBack={() => setView("dashboard")}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <NavBar onMyLearning={() => setView("chatgpt")} />

      <ProgressBanner
        userName={progressBannerData.userFirstName}
        pathName={progressBannerData.pathName}
        jobDemandPercent={progressBannerData.jobDemandPercent}
        progressPercent={progressBannerData.progressPercent}
        courseTitle={progressBannerData.courseTitle}
        certificateName={progressBannerData.certificateName}
        videoSrc={progressBannerData.videoSrc}
      />

      <section className="py-24 md:py-32 border-t border-grey-100 bg-white">
        <div className="px-16 md:max-w-[1113px] md:mx-auto md:px-24">
          <DashboardTabs active={dashboardTab} onChange={setDashboardTab} />
          {renderDashboardContent(dashboardTab)}
        </div>
      </section>
    </div>
  );
}
