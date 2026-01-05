type Props = {
  mutedText: string;
  isDark: boolean;
};

export function ConsultSection({ mutedText, isDark }: Props) {
  return (
    <section
      className={`rounded-3xl p-8 ring-1 ${
        isDark ? "bg-slate-900/60 text-slate-50 ring-white/10" : "bg-white text-slate-900 ring-slate-200 shadow-xl"
      }`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Нужна консультация?</h2>
          <p className={mutedText}>Опишите проблему - предложим решение и сориентируем по стоимости.</p>
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
            className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
          >
            Написать на email
          </a>
        </div>
      </div>
    </section>
  );
}
