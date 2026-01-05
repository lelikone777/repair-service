import type { ThemeStyles } from "@/lib/themeStyles";

type PriceItem = {
  name: string;
  from: number;
  note: string;
};

type Props = {
  isDark: boolean;
  styles: ThemeStyles;
  prices: PriceItem[];
};

export function PricingSection({ isDark, styles, prices }: Props) {
  return (
    <div className={`space-y-4 rounded-3xl p-8 ring-1 ${isDark ? "bg-slate-900/70 text-slate-50 ring-white/10" : "bg-white text-slate-900 ring-slate-200 shadow-xl"}`}>
      <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Прозрачные цены</div>
      <h2 className="text-2xl font-semibold">Примерные расценки</h2>
      <div className="space-y-3">
        {prices.map((item) => (
          <div
            key={item.name}
            className={`flex items-start justify-between rounded-2xl p-4 ring-1 ${
              isDark ? "bg-slate-950/50 ring-white/10" : "bg-slate-50 ring-slate-200"
            }`}
          >
            <div>
              <div className="text-lg font-semibold">{item.name}</div>
              <div className={`text-sm ${styles.mutedText}`}>{item.note}</div>
            </div>
            <div className="text-right">
              <div className="text-lg font-semibold text-sky-200">от {item.from} ₽</div>
              <div className={`text-xs ${styles.mutedText}`}>Диагностика - 0 ₽ при ремонте</div>
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-2xl bg-sky-500/15 p-4 text-sm text-sky-50 ring-1 ring-sky-400/30">
        Точную стоимость озвучим после диагностики. Смету согласуем до начала работ — никаких сюрпризов.
      </div>
    </div>
  );
}
