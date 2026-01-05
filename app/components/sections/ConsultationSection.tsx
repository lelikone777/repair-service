type Props = {
  isDark: boolean;
  mutedTextClass: string;
};

export function ConsultationSection({ isDark, mutedTextClass }: Props) {
  return (
    <section
      className={`rounded-3xl p-8 ring-1 ${
        isDark ? "bg-slate-900/60 text-slate-50 ring-white/10" : "bg-white text-slate-900 ring-slate-200 shadow-xl"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Нужна консультация?</h2>
          <p className={mutedTextClass}>
            Опишите проблему — предложим решение и сориентируем по стоимости.
          </p>
        </div>
        <div className="flex gap-3">
          <a
            href="tel:+78001234567"
            className="rounded-xl bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
          >
            Позвонить сейчас
          </a>
          <a
            href="mailto:info@remont-service.ru"
            className={`rounded-xl px-5 py-3 text-sm font-semibold transition ${
              isDark
                ? "bg-white/10 text-white ring-1 ring-white/20 hover:bg-white/20"
                : "bg-slate-900 text-white hover:bg-slate-800"
            }`}
          >
            Написать на email
          </a>
        </div>
      </div>
    </section>
  );
}
