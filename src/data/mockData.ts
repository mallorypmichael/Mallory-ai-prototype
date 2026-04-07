export const ASSETS = {
  coursePreview: "https://www.figma.com/api/mcp/asset/c214ae2f-98c7-4b6c-b0b3-74379c5b0835",
  rocketIcon: "/rocket-icon.svg",
  googleLogo: "https://www.figma.com/api/mcp/asset/4f5e211b-1bbe-4ecb-a1f6-af971b5a7fd6",
  microsoftLogo: "https://www.figma.com/api/mcp/asset/0727f03d-83cc-4db4-86dc-c3b4b3d8c1b6",
  metaLogo: "https://www.figma.com/api/mcp/asset/9d8f3cd4-a2b4-47ea-acf2-91b7043cac4b",
  ibmLogo: "https://www.figma.com/api/mcp/asset/8b9eacd4-c421-402c-9381-c50ea5e1e29d",
  uiLogo: "https://www.figma.com/api/mcp/asset/d33c82bf-d455-4fab-a725-612443529b74",
  vanderbiltLogo: "https://www.figma.com/api/mcp/asset/d09d48d6-7a16-4037-a684-55643d541e5b",
  macquarieLogo: "https://www.figma.com/api/mcp/asset/7fae0293-84ed-461c-a9df-ed23de69c334",
};

export interface ProgressBannerData {
  userFirstName: string;
  pathName: string;
  jobDemandPercent: number;
  progressPercent: number;
  courseTitle: string;
  certificateName: string;
  videoSrc: string;
}

export const progressBannerData: ProgressBannerData = {
  userFirstName: "Alex",
  pathName: "Digital Marketing",
  jobDemandPercent: 12,
  progressPercent: 46,
  courseTitle: "Share Data Through the Art of Visualization",
  certificateName: "Google Data Analytics & E-commerce Professional Certificate",
  videoSrc: ASSETS.coursePreview,
};

/** Overview skill rows — short labels (not course titles), aligned with Figma. */
export interface OverviewSkillProgressItem {
  id: string;
  label: string;
  current: number;
  total: number;
}

export const overviewSkillProgress: OverviewSkillProgressItem[] = [
  { id: "sk-1", label: "Data Storytelling", current: 13, total: 13 },
  { id: "sk-2", label: "Literacy & Integrity", current: 1, total: 10 },
  { id: "sk-3", label: "Social Media Strategy", current: 4, total: 9 },
  { id: "sk-4", label: "Email Marketing", current: 3, total: 8 },
  { id: "sk-5", label: "Social Media Strategy", current: 4, total: 9 },
  { id: "sk-6", label: "Email Marketing", current: 3, total: 8 },
];

export interface RecentCertificateItem {
  id: string;
  title: string;
  logoSrc: string;
  logoAlt: string;
  linkedInLabel: string;
  secondaryActionLabel: string;
}

export const recentCertificates: RecentCertificateItem[] = [
  {
    id: "rc-1",
    title: "Gen AI Foundations Learning Path",
    logoSrc: ASSETS.googleLogo,
    logoAlt: "Google",
    linkedInLabel: "Add to LinkedIn",
    secondaryActionLabel: "View badge",
  },
  {
    id: "rc-2",
    title: "Google Data Analyst Professional Certificate",
    logoSrc: ASSETS.googleLogo,
    logoAlt: "Google",
    linkedInLabel: "Add to LinkedIn",
    secondaryActionLabel: "View certificate",
  },
];

/* ───────────────────────────────────────────────
 * OpenAI Certified — My Learning enrollments
 * ─────────────────────────────────────────────── */

export interface OpenAIModuleItem {
  id: string;
  title: string;
  type: "Video" | "Reading" | "Graded Assessment" | "Practice";
  completed: boolean;
}

export interface OpenAIModule {
  id: string;
  title: string;
  durationMin?: number;
  items: OpenAIModuleItem[];
}

export interface OpenAIDailyGoal {
  id: string;
  label: string;
  current: number;
  target: number;
}

export type OpenAICourseStatus = "Complete" | "In progress" | "Not started";

export interface OpenAIEnrollment {
  id: string;
  title: string;
  shortDescription: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  estimatedHours: number;
  status: OpenAICourseStatus;
  progressPercent: number;
  modules: OpenAIModule[];
  currentModuleId: string;
  currentItemId: string;
  currentItemTitle: string;
  lastAccessedAt: string;
  learningOutcomes: string[];
  skillTags: string[];
  /** Optional hero / certificate surface tint (e.g. ChatGPT Foundations). */
  brandSurfaceTint?: string;
  /** Shorter label for compact UI (e.g. inline course stepper). Defaults to `title`. */
  stripTitle?: string;
}

export const openAIEnrollments: OpenAIEnrollment[] = [
  {
    id: "oai-1",
    title: "AI Foundations",
    stripTitle: "AI Foundations",
    shortDescription: "Understand how ChatGPT and large language models work, write effective prompts, and use AI responsibly in real work.",
    level: "Beginner",
    estimatedHours: 3,
    status: "Complete",
    progressPercent: 100,
    modules: [
      {
        id: "m1-1", title: "Introduction", durationMin: 21,
        items: [
          { id: "i1-1", title: "Welcome to the course", type: "Video", completed: true },
          { id: "i1-2", title: "How this course is structured", type: "Reading", completed: true },
          { id: "i1-3", title: "Quiz: Introduction", type: "Graded Assessment", completed: true },
        ],
      },
      {
        id: "m1-2", title: "Understanding Large Language Models", durationMin: 34,
        items: [
          { id: "i1-4", title: "What is a large language model?", type: "Video", completed: true },
          { id: "i1-5", title: "Strengths and limitations", type: "Reading", completed: true },
          { id: "i1-6", title: "When to rely on human judgment", type: "Reading", completed: true },
          { id: "i1-7", title: "Quiz: LLMs", type: "Graded Assessment", completed: true },
        ],
      },
      {
        id: "m1-3", title: "Structured Prompting and Evaluating Outputs", durationMin: 27,
        items: [
          { id: "i1-8", title: "Frameworks for effective prompts", type: "Video", completed: true },
          { id: "i1-9", title: "Iterating on responses", type: "Practice", completed: true },
          { id: "i1-10", title: "Evaluating AI outputs", type: "Reading", completed: true },
        ],
      },
      {
        id: "m1-4", title: "Extending the Model", durationMin: 25,
        items: [
          { id: "i1-11", title: "Adding context from files and search", type: "Video", completed: true },
          { id: "i1-12", title: "Practice: Extending capabilities", type: "Practice", completed: true },
        ],
      },
      {
        id: "m1-5", title: "Responsible Use", durationMin: 23,
        items: [
          { id: "i1-13", title: "Responsible AI guidelines", type: "Video", completed: true },
          { id: "i1-14", title: "Privacy and practical considerations", type: "Reading", completed: true },
        ],
      },
      {
        id: "m1-6", title: "Reflections", durationMin: 21,
        items: [
          { id: "i1-15", title: "Course reflections", type: "Reading", completed: true },
        ],
      },
      {
        id: "m1-7", title: "Final Course Assessment", durationMin: 16,
        items: [
          { id: "i1-16", title: "Final assessment", type: "Graded Assessment", completed: true },
        ],
      },
    ],
    currentModuleId: "m1-7",
    currentItemId: "i1-16",
    currentItemTitle: "Final assessment",
    lastAccessedAt: "2026-03-20T16:00:00Z",
    learningOutcomes: [
      "Understand how ChatGPT and large language models work, including their strengths, limitations, and when to rely on human judgment",
      "Write effective prompts using simple frameworks to plan tasks, draft content, and iterate on responses for better results",
      "Evaluate and improve AI generated outputs using simple frameworks and iteration techniques",
      "Use ChatGPT responsibly in real work by adding context from files or search and applying practical responsible AI guidelines",
    ],
    skillTags: ["Model Evaluation", "Information Privacy", "Context Management", "AI Workflows"],
    brandSurfaceTint: "#E6EFFF",
  },
  {
    id: "oai-2",
    title: "Applied AI Foundations Course",
    stripTitle: "Applied AI Foundations",
    shortDescription: "Build practical AI workflows — from prompt engineering to API integration and output evaluation.",
    level: "Intermediate",
    estimatedHours: 10,
    status: "In progress",
    progressPercent: 35,
    modules: [
      {
        id: "m2-1", title: "Getting Started",
        items: [
          { id: "i2-1", title: "Intro", type: "Video", completed: true },
          { id: "i2-2", title: "How this course is structured", type: "Reading", completed: false },
          { id: "i2-3", title: "What to expect from this course", type: "Reading", completed: false },
          { id: "i2-4", title: "Goals", type: "Reading", completed: false },
          { id: "i2-5", title: "Test Your Knowledge", type: "Graded Assessment", completed: false },
        ],
      },
      {
        id: "m2-2", title: "Prompt Engineering",
        items: [
          { id: "i2-6", title: "Chain-of-thought prompting", type: "Video", completed: false },
          { id: "i2-7", title: "Few-shot examples", type: "Reading", completed: false },
          { id: "i2-8", title: "Practice: Advanced prompts", type: "Practice", completed: false },
        ],
      },
      {
        id: "m2-3", title: "Working with the API",
        items: [
          { id: "i2-9", title: "API fundamentals", type: "Video", completed: false },
          { id: "i2-10", title: "Building a workflow", type: "Practice", completed: false },
          { id: "i2-11", title: "Final project", type: "Graded Assessment", completed: false },
        ],
      },
      {
        id: "m2-4", title: "Evaluating Outputs",
        items: [
          { id: "i2-12", title: "Quality metrics", type: "Video", completed: false },
          { id: "i2-13", title: "Evaluation frameworks", type: "Reading", completed: false },
        ],
      },
      {
        id: "m2-5", title: "Real-World Applications",
        items: [
          { id: "i2-14", title: "Case studies", type: "Reading", completed: false },
          { id: "i2-15", title: "Capstone", type: "Graded Assessment", completed: false },
        ],
      },
      {
        id: "m2-6", title: "Course Wrap-Up",
        items: [
          { id: "i2-16", title: "Summary and next steps", type: "Video", completed: false },
        ],
      },
    ],
    currentModuleId: "m2-1",
    currentItemId: "i2-2",
    currentItemTitle: "How this course is structured",
    lastAccessedAt: "2026-03-27T08:30:00Z",
    learningOutcomes: [
      "Build end-to-end AI workflows using prompt chaining and API integration",
      "Apply advanced prompting techniques like chain-of-thought and few-shot learning",
      "Evaluate AI outputs systematically using quality metrics and frameworks",
      "Design and deploy real-world AI applications with proper error handling",
    ],
    skillTags: ["API Integration", "Prompt Engineering", "Output Evaluation", "AI Workflow Design", "Chain-of-Thought", "Few-Shot Learning", "Error Handling", "Python"],
  },
  {
    id: "oai-3",
    title: "AI for Business Strategy",
    stripTitle: "Business strategy",
    shortDescription: "Apply AI to real business problems — from automation to decision-making and change management.",
    level: "Advanced",
    estimatedHours: 50,
    status: "Not started",
    progressPercent: 0,
    modules: [
      {
        id: "m3-1", title: "AI in the Enterprise",
        items: [
          { id: "i3-1", title: "The AI landscape", type: "Video", completed: false },
          { id: "i3-2", title: "Industry adoption patterns", type: "Reading", completed: false },
          { id: "i3-3", title: "Quiz: Enterprise AI", type: "Graded Assessment", completed: false },
        ],
      },
      {
        id: "m3-2", title: "Use Case Discovery",
        items: [
          { id: "i3-4", title: "Identifying opportunities", type: "Video", completed: false },
          { id: "i3-5", title: "Prioritization frameworks", type: "Reading", completed: false },
        ],
      },
      {
        id: "m3-3", title: "Measuring ROI",
        items: [
          { id: "i3-6", title: "Cost-benefit analysis", type: "Video", completed: false },
          { id: "i3-7", title: "KPI frameworks", type: "Reading", completed: false },
        ],
      },
      {
        id: "m3-4", title: "Change Management",
        items: [
          { id: "i3-8", title: "Leading AI adoption", type: "Video", completed: false },
          { id: "i3-9", title: "Final assessment", type: "Graded Assessment", completed: false },
        ],
      },
    ],
    currentModuleId: "m3-1",
    currentItemId: "i3-1",
    currentItemTitle: "The AI landscape",
    lastAccessedAt: "",
    learningOutcomes: [
      "Identify high-impact AI opportunities across your organization",
      "Build business cases for AI initiatives with ROI frameworks",
      "Lead change management for AI adoption across teams",
      "Evaluate AI vendors and solutions against business requirements",
    ],
    skillTags: ["AI Strategy", "Change Management", "ROI Analysis", "Vendor Evaluation", "Business Case Development", "Enterprise AI", "KPI Frameworks"],
  },
  {
    id: "oai-4",
    title: "Capstone",
    shortDescription:
      "Integrate everything you've learned in a final project and demonstrate practical AI mastery across the program.",
    level: "Advanced",
    estimatedHours: 20,
    status: "Not started",
    progressPercent: 0,
    modules: [
      {
        id: "m4-1",
        title: "Capstone project",
        items: [
          { id: "i4-1", title: "Project brief", type: "Reading", completed: false },
          { id: "i4-2", title: "Capstone submission", type: "Graded Assessment", completed: false },
        ],
      },
    ],
    currentModuleId: "m4-1",
    currentItemId: "i4-1",
    currentItemTitle: "Project brief",
    lastAccessedAt: "",
    learningOutcomes: [
      "Synthesize skills from the OpenAI Certified program in an end-to-end deliverable",
      "Demonstrate responsible, production-minded use of AI tools",
    ],
    skillTags: ["Capstone", "AI Integration", "Project Delivery"],
  },
];

/* ───────────────────────────────────────────────
 * OpenAI Certified — Certificates
 * ─────────────────────────────────────────────── */

export interface OpenAICertificate {
  id: string;
  courseTitle: string;
  earnedAt: string;
  cardBackground?: string;
}

export const openAICertificates: OpenAICertificate[] = openAIEnrollments
  .filter((e) => e.status === "Complete")
  .map((e) => ({
    id: `cert-${e.id}`,
    courseTitle: e.title,
    earnedAt: e.lastAccessedAt,
    ...(e.brandSurfaceTint ? { cardBackground: e.brandSurfaceTint } : {}),
  }));

export const openAIDailyGoals: OpenAIDailyGoal[] = [
  { id: "dg-1", label: "Complete 3 course items", current: 1, target: 3 },
  { id: "dg-2", label: "Complete a knowledge check", current: 0, target: 1 },
  { id: "dg-3", label: "Complete a module", current: 0, target: 1 },
];

/* ───────────────────────────────────────────────
 * OpenAI Certified — Skills
 * ─────────────────────────────────────────────── */

export interface OpenAISkill {
  id: string;
  label: string;
  current: number;
  total: number;
}

export const openAISkills: OpenAISkill[] = [
  { id: "osk-1", label: "Prompt Engineering", current: 8, total: 10 },
  { id: "osk-2", label: "API Integration", current: 3, total: 8 },
  { id: "osk-3", label: "AI Safety and Ethics", current: 6, total: 6 },
  { id: "osk-4", label: "Output Evaluation", current: 2, total: 7 },
  { id: "osk-5", label: "Conversational AI Design", current: 5, total: 5 },
  { id: "osk-6", label: "Model Fine-tuning", current: 0, total: 6 },
];

/* ───────────────────────────────────────────────
 * OpenAI Certified — Weekly activity
 * ─────────────────────────────────────────────── */

export interface OpenAIWeeklyDay {
  label: string;
  state: "done" | "today" | "upcoming";
}

export interface OpenAIWeeklyActivity {
  days: OpenAIWeeklyDay[];
  streakDays: number;
  itemsCompleted: number;
  minutesLearned: number;
}

export const openAIWeeklyActivity: OpenAIWeeklyActivity = {
  days: [
    { label: "Mo", state: "done" },
    { label: "Tu", state: "done" },
    { label: "We", state: "done" },
    { label: "Th", state: "done" },
    { label: "Fr", state: "today" },
    { label: "Sa", state: "upcoming" },
    { label: "Su", state: "upcoming" },
  ],
  streakDays: 4,
  itemsCompleted: 7,
  minutesLearned: 45,
};

/* ───────────────────────────────────────────────
 * OpenAI Certified — First-time learner (demo) mocks
 * ─────────────────────────────────────────────── */

function enrollmentResetForFtux(e: OpenAIEnrollment): OpenAIEnrollment {
  const m0 = e.modules[0];
  const i0 = m0?.items[0];
  return {
    ...e,
    status: "Not started",
    progressPercent: 0,
    modules: e.modules.map((m) => ({
      ...m,
      items: m.items.map((it) => ({ ...it, completed: false })),
    })),
    currentModuleId: m0?.id ?? e.currentModuleId,
    currentItemId: i0?.id ?? e.currentItemId,
    currentItemTitle: i0?.title ?? e.currentItemTitle,
    lastAccessedAt: "",
  };
}

/** All courses not started; first in path is the only startable course. */
export const openAIEnrollmentsFtux: OpenAIEnrollment[] = openAIEnrollments.map(enrollmentResetForFtux);

export const openAICertificatesFtux: OpenAICertificate[] = openAIEnrollmentsFtux
  .filter((e) => e.status === "Complete")
  .map((e) => ({
    id: `cert-${e.id}`,
    courseTitle: e.title,
    earnedAt: e.lastAccessedAt,
    ...(e.brandSurfaceTint ? { cardBackground: e.brandSurfaceTint } : {}),
  }));

export const openAIDailyGoalsFtux: OpenAIDailyGoal[] = openAIDailyGoals.map((g) => ({
  ...g,
  current: 0,
}));

export const openAISkillsFtux: OpenAISkill[] = openAISkills.map((s) => ({
  ...s,
  current: 0,
}));

export const openAIWeeklyActivityFtux: OpenAIWeeklyActivity = {
  days: [
    { label: "Mo", state: "upcoming" },
    { label: "Tu", state: "upcoming" },
    { label: "We", state: "upcoming" },
    { label: "Th", state: "upcoming" },
    { label: "Fr", state: "today" },
    { label: "Sa", state: "upcoming" },
    { label: "Su", state: "upcoming" },
  ],
  streakDays: 0,
  itemsCompleted: 0,
  minutesLearned: 0,
};
