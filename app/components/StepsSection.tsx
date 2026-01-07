import type { Step } from "../data/content";

type Props = {
  steps: Step[];
};

export function StepsSection({ steps }: Props) {
  return (
    <section className="space-y-6">
      <div className="flex items-center justify-center gap-4">
        <div className="h-px w-16 bg-slate-200" />
        <h2 className="text-xl font-semibold text-slate-700">Этапы работы</h2>
        <div className="h-px w-16 bg-slate-200" />
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className="relative rounded-2xl bg-white px-4 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.08)] ring-1 ring-slate-200/60"
          >
            <div className="absolute -top-3 left-4 flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-b from-orange-300 to-orange-500 text-sm font-semibold text-white shadow-md">
              {index + 1}
            </div>
            <div className="mt-3 text-sm font-semibold text-slate-700">{step.title}</div>
            <div className="mt-1 text-xs text-slate-500">{step.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
