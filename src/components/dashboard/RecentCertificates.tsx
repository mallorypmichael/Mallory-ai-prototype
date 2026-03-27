import type { RecentCertificateItem } from "../../data/mockData";

interface RecentCertificatesProps {
  items: RecentCertificateItem[];
}

export function RecentCertificates({ items }: RecentCertificatesProps) {
  return (
    <div className="flex flex-col gap-16 w-full">
      <h2 className="cds-title-xs text-grey-975">Recent certificates</h2>
      <ul className="flex flex-col border-t border-grey-100">
        {items.map((item, index) => (
          <li
            key={item.id}
            className={`flex gap-16 py-16 ${index < items.length - 1 ? "border-b border-grey-100" : ""}`}
          >
            <div className="size-48 rounded-8 bg-blue-25 flex flex-shrink-0 items-center justify-center overflow-hidden p-6">
              <img
                src={item.logoSrc}
                alt={item.logoAlt}
                className="max-h-full max-w-full object-contain bg-transparent mix-blend-multiply"
              />
            </div>
            <div className="flex flex-col gap-8 min-w-0 flex-1">
              <p className="cds-body-primary text-grey-975">{item.title}</p>
              <div className="flex flex-wrap gap-16">
                <a
                  href="#"
                  className="cds-action-primary text-blue-700 hover:text-blue-800 transition-colors duration-fast"
                >
                  {item.linkedInLabel}
                </a>
                <a
                  href="#"
                  className="cds-action-primary text-blue-700 hover:text-blue-800 transition-colors duration-fast"
                >
                  {item.secondaryActionLabel}
                </a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
