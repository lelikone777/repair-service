import Image from "next/image";

const guaranteeImage =
  "https://plus.unsplash.com/premium_photo-1661299233465-ad4268ddb448?auto=format&fit=crop&w=900&q=80";

type Props = {
  points: string[];
};

export function GuaranteeSection({ points }: Props) {
  return (
    <section className="grid gap-8 rounded-3xl bg-white/95 p-8 shadow-[0_18px_40px_rgba(15,23,42,0.12)] ring-1 ring-slate-200/70 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-slate-800">
          Оригинальные комплектующие
          <br />
          и гарантия до 12 месяцев
        </h2>
        <ul className="space-y-3 text-sm text-slate-600">
          {points.map((point) => (
            <li key={point} className="flex items-start gap-3">
              <span className="mt-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white">✓</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative h-64 w-full overflow-hidden rounded-3xl shadow-lg">
        <Image src={guaranteeImage} alt="Оригинальные комплектующие" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 420px" />
        <div className="absolute inset-0 bg-gradient-to-l from-white/60 via-white/10 to-transparent" />
      </div>
    </section>
  );
}
