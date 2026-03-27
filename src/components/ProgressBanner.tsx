import { CircularProgress } from "./CircularProgress";
import { ASSETS } from "../data/mockData";
import { HeroGoalsRail } from "./dashboard/HeroGoalsRail";

interface ProgressBannerProps {
  userName: string;
  pathName: string;
  jobDemandPercent: number;
  progressPercent: number;
  courseTitle: string;
  certificateName: string;
  videoSrc: string;
}

export function ProgressBanner({
  userName,
  pathName,
  jobDemandPercent,
  progressPercent,
  courseTitle,
  certificateName,
  videoSrc,
}: ProgressBannerProps) {
  return (
    <section className="w-full bg-blue-25 pt-24 pb-24 sm:pt-32 sm:pb-32">
      <div className="px-16 md:max-w-[1113px] md:mx-auto md:px-24 flex flex-col gap-24">
        <div className="flex flex-col gap-8">
          <p className="cds-action-primary text-grey-975">
            Hi {userName}, here&apos;s your progress in
          </p>
          <div className="flex flex-row flex-wrap items-center gap-12">
            <h1 className="cds-title-sm progress-banner-path-heading text-grey-975">
              {pathName}
            </h1>
            <div className="flex items-center gap-6 min-h-32 px-12 rounded-32 flex-shrink-0 bg-grey-975">
              <img src={ASSETS.rocketIcon} alt="" className="size-16 flex-shrink-0" />
              <span className="cds-action-secondary text-white whitespace-nowrap">
                +{jobDemandPercent}% job demand
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-stretch lg:gap-24 gap-24">
          <div className="bg-white border border-grey-100 rounded-16 p-16 sm:p-24 flex flex-col lg:flex-row lg:items-center gap-24 flex-1 min-h-0 min-w-0 lg:max-w-[769px] lg:self-stretch">
            <div className="flex flex-col gap-16 flex-1 min-w-0 lg:gap-24">
              <div className="shrink-0">
                <CircularProgress percent={progressPercent} size={67} />
              </div>
              <div className="flex flex-col gap-4 min-w-0 w-full">
                <p className="cds-subtitle-md text-grey-975">{courseTitle}</p>
                <p className="cds-body-secondary text-grey-600">{certificateName}</p>
              </div>

              <div className="lg:hidden w-full rounded-8 overflow-hidden flex-shrink-0 bg-grey-100">
                <img
                  src={videoSrc}
                  alt="Course preview"
                  className="block w-full h-auto max-w-full object-contain"
                />
              </div>

              <button
                type="button"
                className="self-start shrink-0 flex items-center justify-center px-16 py-8 bg-blue-700 text-white rounded-8 cds-action-secondary hover:bg-blue-800 transition-colors duration-fast"
              >
                Resume learning
              </button>
            </div>

            <div
              className="hidden lg:block lg:flex-shrink-0 rounded-8 overflow-hidden w-full max-w-[360px] mx-auto lg:mx-0 lg:w-full lg:max-w-[360px]"
              style={{ height: 206 }}
            >
              <img src={videoSrc} alt="Course preview" className="h-full w-full object-cover" />
            </div>
          </div>

          <div className="lg:self-stretch lg:min-h-0 lg:flex lg:flex-col">
            <HeroGoalsRail />
          </div>
        </div>
      </div>
    </section>
  );
}
