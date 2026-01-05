type Props = {
  isDark: boolean;
};

export function SiteFooter({ isDark }: Props) {
  return (
    <footer className={`border-t py-8 ${isDark ? "border-white/10 bg-slate-950/80" : "border-slate-200 bg-white"}`}>
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
        <div className={isDark ? "text-slate-300" : "text-slate-700"}>
          © {new Date().getFullYear()} Ремонт крупной техники
        </div>
        <div className="flex flex-wrap gap-3">
          <span className={isDark ? "text-slate-400" : "text-slate-700"}>ИНН 0000000000</span>
          <span className={isDark ? "text-slate-400" : "text-slate-700"}>ОГРН 0000000000000</span>
          <a className="text-sky-400 hover:text-sky-300" href="#">
            Политика конфиденциальности
          </a>
        </div>
      </div>
    </footer>
  );
}
