import type { Category } from "../data/content";

const iconBase = "h-10 w-10";

function FridgeIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconBase} aria-hidden="true">
      <rect x="6" y="3" width="12" height="18" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
      <rect x="8" y="6" width="8" height="4" rx="1" fill="#bfdbfe" />
      <rect x="8" y="12" width="8" height="6" rx="1" fill="#e0f2fe" />
      <circle cx="9" cy="9" r="0.7" fill="#475569" />
      <circle cx="9" cy="15" r="0.7" fill="#475569" />
    </svg>
  );
}

function WasherIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconBase} aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="4.5" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1.2" />
      <circle cx="12" cy="12" r="2" fill="#e0f2fe" />
      <rect x="7" y="6" width="6" height="1.6" rx="0.8" fill="#94a3b8" />
    </svg>
  );
}

function DishwasherIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconBase} aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
      <rect x="7" y="7" width="10" height="3" rx="1" fill="#bfdbfe" />
      <rect x="7" y="12" width="10" height="6" rx="1" fill="#e0f2fe" />
      <circle cx="9" cy="8.5" r="0.7" fill="#475569" />
      <circle cx="12" cy="8.5" r="0.7" fill="#475569" />
    </svg>
  );
}

function OvenIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconBase} aria-hidden="true">
      <rect x="5" y="4" width="14" height="16" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
      <rect x="7" y="7" width="10" height="2" rx="1" fill="#94a3b8" />
      <rect x="7" y="11" width="10" height="7" rx="1.2" fill="#bfdbfe" />
      <circle cx="9" cy="8" r="0.6" fill="#475569" />
      <circle cx="12" cy="8" r="0.6" fill="#475569" />
      <circle cx="15" cy="8" r="0.6" fill="#475569" />
    </svg>
  );
}

function CooktopIcon() {
  return (
    <svg viewBox="0 0 24 24" className={iconBase} aria-hidden="true">
      <rect x="4" y="6" width="16" height="12" rx="2" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="1.2" />
      <circle cx="9" cy="12" r="2.2" fill="#bfdbfe" stroke="#60a5fa" strokeWidth="1" />
      <circle cx="15" cy="12" r="2.2" fill="#e0f2fe" stroke="#94a3b8" strokeWidth="1" />
    </svg>
  );
}

const iconMap = {
  fridge: FridgeIcon,
  washer: WasherIcon,
  dishwasher: DishwasherIcon,
  oven: OvenIcon,
  cooktop: CooktopIcon,
};

type Props = {
  categories: Category[];
};

export function CategoriesSection({ categories }: Props) {
  return (
    <section className="grid gap-4 rounded-3xl bg-white/95 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70 md:grid-cols-5">
      {categories.map((category) => {
        const Icon = iconMap[category.icon];
        return (
          <div
            key={category.title}
            className="flex flex-col items-center gap-3 rounded-2xl bg-slate-50 px-4 py-4 text-center shadow-sm transition hover:-translate-y-1"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-inner">
              <Icon />
            </div>
            <div className="text-sm font-semibold text-slate-700">{category.title}</div>
          </div>
        );
      })}
    </section>
  );
}
