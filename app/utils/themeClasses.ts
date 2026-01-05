export type ThemeClasses = {
  heroSurface: string;
  formSurface: string;
  chipSurface: string;
  infoSection: string;
  infoCard: string;
  mutedText: string;
  linkAccent: string;
  inputBase: string;
  inputError: string;
};

export const getThemeClasses = (isDark: boolean): ThemeClasses => ({
  heroSurface: isDark
    ? "bg-slate-900/70 text-slate-50 ring-white/10"
    : "bg-white text-slate-900 ring-slate-200 shadow-xl",
  formSurface: isDark ? "bg-white/5 ring-white/10" : "bg-slate-100 ring-slate-200",
  chipSurface: isDark
    ? "bg-white/5 text-slate-200 ring-white/10"
    : "bg-slate-100 text-slate-700 ring-slate-200",
  infoSection: isDark
    ? "space-y-6 rounded-3xl bg-slate-900/80 text-slate-50 p-8 shadow-xl ring-1 ring-white/10"
    : "space-y-6 rounded-3xl bg-white text-slate-900 p-8 shadow-xl ring-1 ring-slate-200",
  infoCard: isDark
    ? "rounded-2xl bg-slate-950/50 p-5 ring-1 ring-white/10 text-slate-50"
    : "rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 text-slate-900",
  mutedText: isDark ? "text-slate-200" : "text-slate-600",
  linkAccent: isDark ? "text-sky-300 hover:text-sky-200" : "text-sky-600 hover:text-sky-500",
  inputBase: isDark
    ? "ring-1 bg-slate-950/50 text-slate-50 ring-white/10 focus:ring-sky-400"
    : "ring-1 bg-white text-slate-900 ring-slate-300 focus:ring-sky-500",
  inputError: isDark
    ? "ring-2 ring-rose-400 focus:ring-rose-400"
    : "ring-2 ring-rose-500 focus:ring-rose-500",
});
