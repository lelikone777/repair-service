type Props = {
  brands: string[];
};

export function BrandsSection({ brands }: Props) {
  return (
    <section className="rounded-3xl bg-white/95 p-6 shadow-[0_16px_40px_rgba(15,23,42,0.1)] ring-1 ring-slate-200/70">
      <div className="grid gap-4 sm:grid-cols-5 md:grid-cols-7">
        {brands.map((brand) => (
          <div
            key={brand}
            className="flex items-center justify-center rounded-xl bg-slate-50 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-500"
          >
            {brand}
          </div>
        ))}
      </div>
    </section>
  );
}
