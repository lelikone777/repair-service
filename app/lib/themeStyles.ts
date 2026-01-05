export function themeStyles(isDark: boolean) {
  const heroSurface = isDark
    ? "bg-slate-900/70 text-slate-50 ring-white/10"
    : "bg-white text-slate-900 ring-slate-200 shadow-xl";

  const formSurface = isDark ? "bg-white/5 ring-white/10" : "bg-slate-100 ring-slate-200";
  const chipSurface = isDark
    ? "bg-white/5 text-slate-200 ring-white/10"
    : "bg-slate-100 text-slate-700 ring-slate-200";

  const infoSection = isDark
    ? "rounded-3xl bg-slate-900/80 text-slate-50 p-8 shadow-xl ring-1 ring-white/10"
    : "rounded-3xl bg-white text-slate-900 p-8 shadow-xl ring-1 ring-slate-200";

  const infoCard = isDark
    ? "rounded-2xl bg-slate-950/50 p-5 ring-1 ring-white/10 text-slate-50"
    : "rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 text-slate-900";

  const mutedText = isDark ? "text-slate-200" : "text-slate-600";
  const linkAccent = isDark ? "text-sky-300 hover:text-sky-200" : "text-sky-600 hover:text-sky-500";

  const inputBase = isDark
    ? "ring-1 bg-slate-950/50 text-slate-50 ring-white/10 focus:ring-sky-400"
    : "ring-1 bg-white text-slate-900 ring-slate-300 focus:ring-sky-500";

  const inputError = isDark
    ? "ring-2 ring-rose-400 focus:ring-rose-400"
    : "ring-2 ring-rose-500 focus:ring-rose-500";

  return {
    heroSurface,
    formSurface,
    chipSurface,
    infoSection,
    infoCard,
    mutedText,
    linkAccent,
    inputBase,
    inputError,
  };
}

export type ThemeStyles = ReturnType<typeof themeStyles>;
