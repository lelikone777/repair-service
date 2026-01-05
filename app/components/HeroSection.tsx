import { LeadForm } from "./LeadForm";
import type { ThemeClasses } from "../utils/themeClasses";
import type { Advantage } from "../data/content";

type Props = {
  advantages: Advantage[];
  heroSurface: string;
  chipSurface: string;
  mutedText: string;
  isDark: boolean;
  formSurface: string;
  formClasses: Pick<ThemeClasses, "inputBase" | "inputError" | "mutedText">;
};

export function HeroSection({
  advantages,
  heroSurface,
  chipSurface,
  mutedText,
  isDark,
  formSurface,
  formClasses,
}: Props) {
  return (
    <section
      className={`grid gap-10 rounded-3xl p-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center lg:p-12 ${heroSurface}`}
    >
      <div className="space-y-6">
        <div
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ring-1 ${chipSurface}`}
        >
          Срочный ремонт • Выезд в день обращения
        </div>
        <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          Ремонт крупной бытовой техники дома и в сервисе
        </h1>
        <p className={`max-w-2xl text-lg ${mutedText}`}>
          Работаем с холодильниками, стиральными машинами, посудомойками, плитами, варочными панелями и
          кондиционерами. Оригинальные комплектующие, гарантия до 12 месяцев, прозрачные цены.
        </p>
        <div className="flex flex-wrap gap-3">
          <span
            className={`rounded-full px-3 py-1 text-sm ring-1 ${
              isDark ? "bg-sky-500/15 text-sky-100 ring-sky-400/40" : "bg-sky-100 text-sky-800 ring-sky-200"
            }`}
          >
            LG • Bosch • Samsung • Siemens • Electrolux
          </span>
          <span className={`rounded-full px-3 py-1 text-sm ring-1 ${chipSurface}`}>Москва и область</span>
          <span className={`rounded-full px-3 py-1 text-sm ring-1 ${chipSurface}`}>Без выходных, 8:00-22:00</span>
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
              <div className={`mt-2 ${mutedText}`}>{item.text}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl p-6 shadow-2xl shadow-sky-900/30 ring-1 lg:p-8 ${formSurface}`}>
        <div className={`mb-5 text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
          Оставьте заявку - перезвоним за 5-10 минут
        </div>
        <LeadForm classes={formClasses} isDark={isDark} />
      </div>
    </section>
  );
}
