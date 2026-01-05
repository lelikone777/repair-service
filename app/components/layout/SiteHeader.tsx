import { ThemeChoice } from "@/hooks/useThemeChoice";

type Props = {
  isDark: boolean;
  theme: ThemeChoice;
  onThemeCycle: () => void;
};

export function SiteHeader({ isDark, theme, onThemeCycle }: Props) {
  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <div className="text-lg font-semibold tracking-tight">
        <span className="text-sky-400">РЕМОНТ</span> ТЕХНИКИ
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className={`hidden sm:block ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          Москва и область
        </div>
        <div
          className={`rounded-full px-4 py-2 text-slate-100 shadow-lg shadow-slate-900/40 ring-1 ${
            isDark ? "bg-slate-900/70 ring-white/10" : "bg-white text-slate-900 ring-slate-200"
          }`}
        >
          <div className="text-xs uppercase text-slate-300">Приём заявок</div>
          <div className="text-base font-semibold leading-tight">8:00-22:00</div>
        </div>
        <a
          className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          href="tel:+78001234567"
        >
          +7 (800) 123-45-67
        </a>
        <button
          type="button"
          onClick={onThemeCycle}
          className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
            isDark
              ? "border border-white/10 bg-slate-900/60 text-slate-100 shadow-sm shadow-slate-900/40 hover:border-white/30 hover:bg-slate-900/80"
              : "border border-slate-300/60 bg-white text-slate-900 shadow hover:border-slate-400/80 hover:bg-slate-50"
          }`}
        >
          Тема: {theme === "system" ? "системная" : theme === "light" ? "светлая" : "тёмная"}
        </button>
      </div>
    </header>
  );
}
