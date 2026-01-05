type Props = {
  brands: string[];
  isDark: boolean;
};

export function BrandsSection({ brands, isDark }: Props) {
  const brandLine = [...brands, ...brands].join(" · ");

  return (
    <section
      className={`overflow-hidden rounded-3xl p-6 ring-1 ${
        isDark ? "bg-slate-900/60 ring-white/10" : "bg-white ring-slate-200 shadow-xl"
      }`}
    >
      <div className="text-sm uppercase tracking-[0.2em] text-slate-300">Бренды</div>
      <h2 className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
        Оригинальные запчасти и заводские регламенты
      </h2>
      <div
        className={`mt-6 w-full overflow-hidden rounded-2xl p-4 ring-1 ${
          isDark ? "bg-slate-950/40 ring-white/5" : "bg-slate-100 ring-slate-200"
        }`}
      >
        <div className={`animate-marquee whitespace-nowrap text-lg font-semibold ${isDark ? "text-slate-100" : "text-slate-800"}`}>
          {brandLine}
        </div>
      </div>
    </section>
  );
}
