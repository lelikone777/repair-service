import { ThemeChoice } from "@/hooks/useThemeChoice";

type Props = {
  isDark: boolean;
  theme: ThemeChoice;
  onThemeCycle: () => void;
};

export function SiteHeader({ isDark }: Props) {
  const isLight = !isDark;

  return (
    <header className="mx-auto w-full max-w-6xl px-6 pt-6">
      <div
        className={`flex w-full items-center justify-between gap-6 rounded-2xl px-6 py-3 shadow-lg ring-1 ${
          isLight
            ? "bg-white/90 text-slate-700 ring-slate-200/70"
            : "bg-slate-900/70 text-slate-100 ring-white/10"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-inner ring-1 ring-slate-200">
            <span className="h-4 w-4 rounded-sm bg-gradient-to-br from-sky-400 to-amber-400" />
          </div>
          <div className="text-sm font-semibold tracking-tight text-slate-800">Company</div>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          <a className="hover:text-slate-900" href="#services">
            Новое
          </a>
          <a className="hover:text-slate-900" href="#steps">
            Техника
          </a>
          <a className="hover:text-slate-900" href="#reviews">
            Отзывы
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <a className="text-sm font-semibold text-slate-800" href="tel:+798776543210">
            +7 9877 654-32-10
          </a>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-semibold text-white">
              WA
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-sky-500 text-[10px] font-semibold text-white">
              TG
            </span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-[10px] font-semibold text-white">
              VK
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
