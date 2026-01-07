import Image from "next/image";
import type { Category, HeroBenefit } from "../data/content";

const heroImage =
  "https://plus.unsplash.com/premium_photo-1683134584513-db73da8ebc29?auto=format&fit=crop&w=900&q=80";

type Props = {
  categories: Category[];
  heroBenefits: HeroBenefit[];
};

export function HeroSection({ categories, heroBenefits }: Props) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white/95 p-8 shadow-[0_24px_60px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/80 lg:p-12">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.16),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(14,165,233,0.16),transparent_45%)]" />
      <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div className="space-y-6">
          <div className="text-lg font-semibold uppercase tracking-[0.16em] text-slate-500">
            Ремонт крупной бытовой техники
          </div>
          <h1 className="text-4xl font-bold text-slate-900 sm:text-5xl">
            НА ДОМУ
          </h1>
          <p className="text-sm font-medium text-slate-600">
            {categories.map((item) => item.title).join(" • ")}
          </p>
          <ul className="space-y-2 text-sm text-slate-700">
            {heroBenefits.map((benefit) => (
              <li key={benefit.text} className="flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs text-white">✓</span>
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-xl bg-gradient-to-b from-orange-400 to-orange-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(234,88,12,0.35)] transition hover:translate-y-[-1px]">
              Вызвать мастера
            </button>
            <button className="rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.35)] transition hover:translate-y-[-1px]">
              Узнать стоимость
            </button>
          </div>
        </div>
        <div className="relative mx-auto h-[320px] w-full max-w-sm lg:h-[420px]">
          <div className="absolute inset-0 rounded-3xl bg-white/80 shadow-[0_18px_40px_rgba(15,23,42,0.18)]" />
          <Image
            src={heroImage}
            alt="Мастер по ремонту техники"
            fill
            className="rounded-3xl object-cover"
            sizes="(max-width: 1024px) 100vw, 420px"
            priority
          />
        </div>
      </div>
    </section>
  );
}
