import { LeadFormCard } from "@/components/LeadFormCard";
import type { ThemeStyles } from "@/lib/themeStyles";

type Advantage = {
  title: string;
  text: string;
};

type Props = {
  isDark: boolean;
  styles: ThemeStyles;
  brandHighlights: string;
  advantages: Advantage[];
};

export function HeroSection({ isDark, styles, brandHighlights, advantages }: Props) {
  return (
    <section
      className={`grid gap-10 rounded-3xl p-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center lg:p-12 ${styles.heroSurface}`}
    >
      <div className="space-y-6">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ring-1 ${styles.chipSurface}`}
        >
          Срочный ремонт · Выезд в день обращения
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Ремонт крупной бытовой техники дома и в сервисе
        </h1>
        <p className={`max-w-2xl text-lg ${styles.mutedText}`}>
          Работаем с холодильниками, стиральными машинами, посудомойками,
          плитами, варочными панелями и кондиционерами. Оригинальные
          комплектующие, гарантия до 12 месяцев, прозрачные цены.
        </p>
        <div className="flex flex-wrap gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm ring-1 ${
              isDark ? "bg-sky-500/15 text-sky-100 ring-sky-400/40" : "bg-sky-100 text-sky-800 ring-sky-200"
            }`}
          >
            {brandHighlights}
          </span>
          <span className={`rounded-full px-3 py-1 text-sm ring-1 ${styles.chipSurface}`}>
            Москва и область
          </span>
          <span className={`rounded-full px-3 py-1 text-sm ring-1 ${styles.chipSurface}`}>
            Без выходных, 8:00-22:00
          </span>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          {advantages.map((item) => (
            <div
              key={item.title}
              className={`rounded-2xl p-4 text-sm ring-1 ${
                isDark ? "bg-white/5 text-slate-100 ring-white/10" : "bg-slate-100 text-slate-800 ring-slate-200"
              }`}
            >
              <div className={`text-base font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                {item.title}
              </div>
              <div className={`mt-2 ${styles.mutedText}`}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <LeadFormCard isDark={isDark} styles={styles} />
    </section>
  );
}
