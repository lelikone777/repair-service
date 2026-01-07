import type { WhyUsItem } from "../data/content";

const iconWrap = "flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-b from-orange-300 to-orange-500 text-white shadow-md";

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 4 3 12h2v7h5v-4h4v4h5v-7h2l-9-8Z"
      />
    </svg>
  );
}

function TagIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M3 11.5 12.5 2H21v8.5L11.5 20 3 11.5Zm13-3a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path fill="currentColor" d="M12 3 4 6v6c0 5 3.4 9 8 10 4.6-1 8-5 8-10V6l-8-3Z" />
      <path fill="white" d="m10.3 13.7-2.2-2.2 1.4-1.4 0.8 0.8 3.6-3.6 1.4 1.4-5 5Z" />
    </svg>
  );
}

function WalletIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 6a2 2 0 0 1 2-2h11a1 1 0 1 1 0 2H6v2h12a2 2 0 0 1 2 2v5a3 3 0 0 1-3 3H6a2 2 0 0 1-2-2V6Zm13 6a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"
      />
    </svg>
  );
}

function CalendarIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" aria-hidden="true">
      <path
        fill="currentColor"
        d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1a2 2 0 0 1 2 2v3H2V6a2 2 0 0 1 2-2h1V3a1 1 0 0 1 1-1Zm14 9v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-8h18Z"
      />
    </svg>
  );
}

const iconMap = {
  home: HomeIcon,
  tag: TagIcon,
  shield: ShieldIcon,
  wallet: WalletIcon,
  calendar: CalendarIcon,
};

type Props = {
  items: WhyUsItem[];
};

export function BenefitsSection({ items }: Props) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-slate-200" />
        <h2 className="text-xl font-semibold text-slate-700">Почему выбирают нас</h2>
        <div className="h-px w-16 bg-slate-200" />
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white px-4 py-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60"
            >
              <div className={iconWrap}>
                <Icon />
              </div>
              <div className="text-sm font-semibold text-slate-700">{item.title}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
