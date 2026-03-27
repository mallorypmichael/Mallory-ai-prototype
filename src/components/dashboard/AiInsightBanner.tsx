export function AiInsightBanner() {
  return (
    <div className="flex gap-12 md:gap-16 p-16 md:p-24 bg-blue-25 rounded-16 items-start">
      <span
        className="material-symbols-rounded text-grey-975 flex-shrink-0"
        style={{
          fontSize: 24,
          fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
        }}
      >
        auto_awesome
      </span>
      <p className="cds-body-primary text-grey-975">
        <span className="cds-action-primary text-grey-975">Great pace!</span> You&apos;re averaging 52
        minutes per session this month. At this rate, you&apos;ll complete your specialization 2 weeks
        ahead of your February 15th goal.
      </p>
    </div>
  );
}
