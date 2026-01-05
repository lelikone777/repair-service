import type { ThemeStyles } from "@/lib/themeStyles";

type Props = {
  isDark: boolean;
  styles: ThemeStyles;
};

export function GuaranteeSection({ isDark, styles }: Props) {
  return (
    <section className={`grid gap-6 md:grid-cols-2 ${styles.infoSection}`}>
      <div className="space-y-3">
        <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Гарантия</div>
        <h2 className="text-2xl font-semibold">До 12 месяцев на работу и детали</h2>
        <p className={styles.mutedText}>
          Используем оригинальные запчасти и официальные регламенты. По завершении
          ремонта вы получаете чек и гарантийный талон.
        </p>
        <ul className={`space-y-2 text-sm ${styles.mutedText}`}>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
            <span>Оригинальные комплектующие — заказ напрямую у поставщиков</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
            <span>Гарантия до 1 года — в талоне фиксируем сроки и объём работ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
            <span>Поддержка после ремонта — отвечаем на вопросы и помогаем с уходом</span>
          </li>
        </ul>
      </div>
      <div
        className={`space-y-4 rounded-2xl p-6 ring-1 ${
          isDark ? "bg-slate-950/60 ring-white/10" : "bg-slate-100 ring-slate-200"
        }`}
      >
        <div className="text-sm uppercase tracking-[0.18em] text-slate-300">Контакты</div>
        <h3 className={`text-xl font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
          Москва и ближайшая область
        </h3>
        <p className={styles.mutedText}>
          Выезжаем по городу и области. Пришлите адрес — подскажем, сколько займет дорога и во сколько приедет мастер.
        </p>
        <div className={`space-y-2 text-sm ${isDark ? "text-slate-100" : "text-slate-800"}`} id="contact">
          <div className={`font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>Телефон: +7 (800) 123-45-67</div>
          <div>Приём заявок: 8:00-22:00 ежедневно</div>
          <div>Email: info@remont-service.ru</div>
        </div>
        <a
          href="tel:+78001234567"
          className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${
            isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-900 hover:bg-slate-800"
          }`}
        >
          Позвонить мастеру
        </a>
      </div>
    </section>
  );
}
