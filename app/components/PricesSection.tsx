import type { PriceItem } from "../data/content";

type Props = {
  prices: PriceItem[];
};

export function PricesSection({ prices }: Props) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/60">
      <div className="text-base font-semibold text-slate-700">Прозрачные цены</div>
      <div className="mt-4 space-y-3 text-sm text-slate-600">
        {prices.map((item) => (
          <div key={item.title} className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
            <span>{item.title}</span>
            <span className="font-semibold text-slate-800">от {item.from} ₽</span>
          </div>
        ))}
      </div>
      <div className="mt-4 text-xs text-slate-500">* Точная стоимость — до начала ремонта</div>
      <button className="mt-5 w-full rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_26px_rgba(16,185,129,0.4)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
        Вызвать мастера
      </button>
      <ul className="mt-4 space-y-2 text-xs text-slate-600">
        <li className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">✓</span>
          Гарантия до 12 месяцев
        </li>
        <li className="flex items-center gap-2">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">✓</span>
          Без выходных
        </li>
      </ul>
    </div>
  );
}
