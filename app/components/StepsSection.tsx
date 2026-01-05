type Props = {
  steps: string[];
  infoSection: string;
  mutedText: string;
  isDark: boolean;
};

export function StepsSection({ steps, infoSection, mutedText, isDark }: Props) {
  return (
    <div className={`${infoSection} space-y-5`}>
      <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Этапы работы</div>
      <h2 className="text-2xl font-semibold">Как всё проходит</h2>
      <div className="space-y-4">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`flex gap-4 rounded-2xl p-4 ring-1 ${
              isDark ? "bg-slate-950/50 ring-white/10" : "bg-slate-50 ring-slate-200"
            }`}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-base font-semibold text-white">
              {index + 1}
            </div>
            <p className={mutedText}>{step}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
