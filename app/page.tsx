"use client";

import { useEffect, useMemo, useState } from "react";

const services = [
  {
    title: "Холодильники",
    items: ["Не морозит / не холодит", "Шумит компрессор", "Появился иней"],
  },
  {
    title: "Стиральные машины",
    items: [
      "Не сливает воду",
      "Не крутит барабан",
      "Выдаёт ошибку программы",
    ],
  },
  {
    title: "Посудомойки",
    items: ["Плохо моет", "Не набирает/сливает воду", "Подтекает"],
  },
  {
    title: "Духовые шкафы и плиты",
    items: ["Не греет духовка", "Не включается конфорка", "Пахнет газ"],
  },
  {
    title: "Варочные панели",
    items: ["Сбои сенсора", "Не включается зона", "Выбивает автомат"],
  },
  {
    title: "Кондиционеры",
    items: ["Не охлаждает", "Капает вода", "Шумит внутренний блок"],
  },
];

const brands = [
  "LG",
  "Bosch",
  "Samsung",
  "Indesit",
  "AEG",
  "Siemens",
  "Electrolux",
  "Whirlpool",
  "Beko",
  "Haier",
  "Gorenje",
  "Candy",
];

const advantages = [
  {
    title: "Выезд за 30–90 минут",
    text: "Мастера в каждом районе. Работаем ежедневно с 8:00 до 22:00.",
  },
  {
    title: "Гарантия до 1 года",
    text: "Оригинальные запчасти, чек и гарантийный талон на каждый ремонт.",
  },
  {
    title: "Честная цена",
    text: "Диагностика — 0 ₽ при согласии на ремонт. Итоговая смета до начала работ.",
  },
];

const steps = [
  "Принимаем заявку по телефону или через форму",
  "Согласуем время и примерную стоимость",
  "Мастер приезжает, проводит диагностику",
  "Согласовываем ремонт, меняем детали и тестируем",
  "Вы получаете чек и гарантию до 12 месяцев",
];

const prices = [
  { name: "Холодильники", from: 1200, note: "Замена реле, дозаправка, устранение течи" },
  { name: "Стиральные машины", from: 1100, note: "Сливной насос, подшипники, модуль" },
  { name: "Посудомойки", from: 1300, note: "Протечки, ТЭН, циркуляционный насос" },
  { name: "Плиты/духовки", from: 1400, note: "ТЭН, термостат, газ-контроль" },
  { name: "Кондиционеры", from: 1500, note: "Заправка, чистка, дренаж" },
];

type FormState = "idle" | "loading" | "sent";
type FormErrors = Partial<Record<"name" | "phone" | "brand" | "issue", string>>;
type ThemeChoice = "light" | "dark" | "system";

export default function Home() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [theme, setTheme] = useState<ThemeChoice>(() => {
    if (typeof window === "undefined") return "system";
    const saved = window.localStorage.getItem("theme-choice") as ThemeChoice | null;
    return saved ?? "system";
  });
  const [systemTheme, setSystemTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setSystemTheme(media.matches ? "dark" : "light");
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  const resolvedTheme = theme === "system" ? systemTheme : theme;
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("theme-choice", theme);
    document.documentElement.dataset.theme = resolvedTheme;
    document.documentElement.classList.toggle("dark", isDark);
  }, [theme, resolvedTheme, isDark]);

  const brandLine = useMemo(
    () => [...brands, ...brands].join(" · "),
    []
  );

  const heroSurface = isDark
    ? "bg-slate-900/70 text-slate-50 ring-white/10"
    : "bg-white text-slate-900 ring-slate-200 shadow-xl";
  const formSurface = isDark ? "bg-white/5 ring-white/10" : "bg-slate-100 ring-slate-200";
  const chipSurface = isDark ? "bg-white/5 text-slate-200 ring-white/10" : "bg-slate-100 text-slate-700 ring-slate-200";
  const infoSection = isDark
    ? "space-y-6 rounded-3xl bg-slate-900/80 text-slate-50 p-8 shadow-xl ring-1 ring-white/10"
    : "space-y-6 rounded-3xl bg-white text-slate-900 p-8 shadow-xl ring-1 ring-slate-200";
  const infoCard = isDark
    ? "rounded-2xl bg-slate-950/50 p-5 ring-1 ring-white/10 text-slate-50"
    : "rounded-2xl bg-slate-50 p-5 ring-1 ring-slate-200 text-slate-900";
  const mutedText = isDark ? "text-slate-200" : "text-slate-600";
  const linkAccent = isDark ? "text-sky-300 hover:text-sky-200" : "text-sky-600 hover:text-sky-500";
  const inputBase = isDark
    ? "ring-1 bg-slate-950/50 text-slate-50 ring-white/10 focus:ring-sky-400"
    : "ring-1 bg-white text-slate-900 ring-slate-300 focus:ring-sky-500";
  const inputError = isDark
    ? "ring-2 ring-rose-400 focus:ring-rose-400"
    : "ring-2 ring-rose-500 focus:ring-rose-500";

  const formatPhone = (digits: string) => {
    if (!digits) return "";
    if (digits === "7") return "+7";

    const rest = digits.slice(1);
    let result = "+7";

    if (rest.length) {
      result += " (" + rest.slice(0, Math.min(3, rest.length));
      if (rest.length >= 3) result += ")";
      if (rest.length > 3) result += " " + rest.slice(3, Math.min(6, rest.length));
      if (rest.length > 6) result += "-" + rest.slice(6, Math.min(8, rest.length));
      if (rest.length > 8) result += "-" + rest.slice(8, 10);
    }

    return result;
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const raw = event.target.value;
    let digits = raw.replace(/\D/g, "");
    const prevDigits = phone.replace(/\D/g, "");

    // Если удалили символ маски ( ) или пробел, но цифры не изменились — убираем последнюю цифру вручную
    if (raw.length < phone.length && digits === prevDigits && prevDigits.length > 0) {
      digits = digits.slice(0, -1);
    }

    if (digits.startsWith("8")) {
      digits = "7" + digits.slice(1);
    } else if (digits && !digits.startsWith("7")) {
      digits = "7" + digits;
    }

    digits = digits.slice(0, 11);

    setPhone(formatPhone(digits));
  };

  const validateForm = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = (formData.get("name") ?? "").toString().trim();
    const phone = (formData.get("phone") ?? "").toString().trim();
    const brand = (formData.get("brand") ?? "").toString().trim();
    const issue = (formData.get("issue") ?? "").toString().trim();

    const phoneDigits = phone.replace(/\D/g, "");
    const nextErrors: FormErrors = {};

    if (name.length < 2) {
      nextErrors.name = "Введите имя (минимум 2 символа).";
    }
    if (phoneDigits.length !== 11) {
      nextErrors.phone = "Укажите телефон полностью (+7 и 10 цифр).";
    }
    if (brand.length < 2) {
      nextErrors.brand = "Уточните бренд и тип техники.";
    }
    if (issue.length < 6) {
      nextErrors.issue = "Опишите проблему подробнее (минимум 6 символов).";
    }

    setErrors(nextErrors);
    return {
      isValid: Object.keys(nextErrors).length === 0,
      payload: { name, phone, brand, issue },
    };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { isValid } = validateForm(form);
    if (!isValid) {
      setFormState("idle");
      return;
    }
    setErrors({});
    setFormState("loading");

    setTimeout(() => {
      setFormState("sent");
    }, 900);

    setTimeout(() => {
      setFormState("idle");
      form.reset();
      setPhone("");
    }, 2400);
  };

  return (
    <div
      className={`relative min-h-screen ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.12),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(236,72,153,0.08),transparent_22%)]" />

      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
        <div className="text-lg font-semibold tracking-tight">
          <span className="text-sky-400">РЕМОНТ</span> ТЕХНИКИ
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className={`hidden sm:block ${isDark ? "text-slate-300" : "text-slate-600"}`}>Москва и область</div>
          <div
            className={`rounded-full px-4 py-2 text-slate-100 shadow-lg shadow-slate-900/40 ring-1 ${
              isDark ? "bg-slate-900/70 ring-white/10" : "bg-white text-slate-900 ring-slate-200"
            }`}
          >
            <div className="text-xs uppercase text-slate-300">Приём заявок</div>
            <div className="text-base font-semibold leading-tight">8:00-22:00</div>
          </div>
          <a
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400"
            href="tel:+78001234567"
          >
            +7 (800) 123-45-67
          </a>
          <button
            type="button"
            onClick={() =>
              setTheme((prev) =>
                prev === "system" ? "light" : prev === "light" ? "dark" : "system"
              )
            }
            className={`rounded-full px-4 py-2 text-xs font-semibold transition ${
              isDark
                ? "border border-white/10 bg-slate-900/60 text-slate-100 shadow-sm shadow-slate-900/40 hover:border-white/30 hover:bg-slate-900/80"
                : "border border-slate-300/60 bg-white text-slate-900 shadow hover:border-slate-400/80 hover:bg-slate-50"
            }`}
          >
            Тема: {theme === "system" ? "системная" : theme === "light" ? "светлая" : "тёмная"}
          </button>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-4">
        <section
          className={`grid gap-10 rounded-3xl p-8 lg:grid-cols-[1.2fr_0.9fr] lg:items-center lg:p-12 ${heroSurface}`}
        >
          <div className="space-y-6">
            <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs uppercase tracking-[0.18em] ring-1 ${chipSurface}`}>
              Срочный ремонт • Выезд в день обращения
            </div>
            <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Ремонт крупной бытовой техники дома и в сервисе
            </h1>
            <p className={`max-w-2xl text-lg ${mutedText}`}>
              Работаем с холодильниками, стиральными машинами, посудомойками,
              плитами, варочными панелями и кондиционерами. Оригинальные
              комплектующие, гарантия до 12 месяцев, прозрачные цены.
            </p>
            <div className="flex flex-wrap gap-3">
              <span className={`rounded-full px-3 py-1 text-sm ring-1 ${isDark ? "bg-sky-500/15 text-sky-100 ring-sky-400/40" : "bg-sky-100 text-sky-800 ring-sky-200"}`}>
                LG • Bosch • Samsung • Siemens • Electrolux
              </span>
              <span className={`rounded-full px-3 py-1 text-sm ring-1 ${chipSurface}`}>
                Москва и область
              </span>
              <span className={`rounded-full px-3 py-1 text-sm ring-1 ${chipSurface}`}>
                Без выходных, 8:00–22:00
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {advantages.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-2xl p-4 text-sm ring-1 ${isDark ? "bg-white/5 text-slate-100 ring-white/10" : "bg-slate-100 text-slate-800 ring-slate-200"}`}
                >
                  <div
                    className={`text-base font-semibold ${
                      isDark ? "text-white" : "text-slate-900"
                    }`}
                  >
                    {item.title}
                  </div>
                  <div className={`mt-2 ${mutedText}`}>{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-2xl p-6 shadow-2xl shadow-sky-900/30 ring-1 lg:p-8 ${formSurface}`}>
            <div
              className={`mb-5 text-lg font-semibold ${
                isDark ? "text-white" : "text-slate-900"
              }`}
            >
              Оставьте заявку - перезвоним за 5-10 минут
            </div>
            {formState === "idle" ? (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label className="space-y-3 text-sm text-slate-200">
                    <span>Ваше имя</span>
                    <input
                      required
                      name="name"
                      className={`w-full rounded-xl px-4 py-3 focus:outline-none ${
                        errors.name ? inputError : `${inputBase} focus:ring-2`
                      }`}
                      placeholder="Алексей"
                      aria-invalid={Boolean(errors.name)}
                      aria-describedby="name-error"
                    />
                    {errors.name ? (
                      <p id="name-error" className="text-xs text-rose-200">
                        {errors.name}
                      </p>
                    ) : null}
                  </label>
                  <label className="space-y-3 text-sm text-slate-200">
                    <span>Телефон</span>
                    <input
                      required
                      name="phone"
                      type="tel"
                      className={`w-full rounded-xl px-4 py-3 tracking-wide focus:outline-none ${
                        errors.phone ? inputError : `${inputBase} focus:ring-2`
                      }`}
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={handlePhoneChange}
                      maxLength={18}
                      aria-invalid={Boolean(errors.phone)}
                      aria-describedby="phone-error"
                    />
                    {errors.phone ? (
                      <p id="phone-error" className="text-xs text-rose-200">
                        {errors.phone}
                      </p>
                    ) : null}
                  </label>
                </div>
                <label className="space-y-3 text-sm text-slate-200">
                  <span>Бренд и тип техники</span>
                  <input
                    required
                    name="brand"
                    className={`w-full rounded-xl px-4 py-3 focus:outline-none ${
                      errors.brand ? inputError : `${inputBase} focus:ring-2`
                    }`}
                    placeholder="LG, Bosch, холодильник/стир. машина"
                    aria-invalid={Boolean(errors.brand)}
                    aria-describedby="brand-error"
                  />
                  {errors.brand ? (
                    <p id="brand-error" className="text-xs text-rose-200">
                      {errors.brand}
                    </p>
                  ) : null}
                </label>
                <label className="space-y-3 text-sm text-slate-200">
                  <span>Что случилось</span>
                  <textarea
                    required
                    name="issue"
                    className={`h-24 w-full rounded-xl px-4 py-3 focus:outline-none ${
                      errors.issue ? inputError : `${inputBase} focus:ring-2`
                    }`}
                    placeholder="Не холодит, шумит, ошибка E02..."
                    aria-invalid={Boolean(errors.issue)}
                    aria-describedby="issue-error"
                  />
                  {errors.issue ? (
                    <p id="issue-error" className="text-xs text-rose-200">
                      {errors.issue}
                    </p>
                  ) : null}
                </label>
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-sky-500 px-4 py-3 text-base font-semibold text-slate-950 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300"
                >
                  Отправить заявку
                </button>
                <p className={`text-xs ${isDark ? "text-slate-400" : "text-slate-500"}`}>
                  Нажимая кнопку, вы даёте согласие на обработку персональных данных.
                </p>
              </form>
            ) : (
              <div
                className={`flex min-h-[360px] flex-col items-center justify-center gap-4 rounded-2xl border text-center ${
                  isDark
                    ? "border-white/10 bg-slate-950/40 text-slate-50"
                    : "border-slate-200 bg-white text-slate-900"
                }`}
              >
                {formState === "loading" ? (
                  <>
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-sky-400" />
                    <div className={`text-sm ${mutedText}`}>Отправляем заявку...</div>
                  </>
                ) : (
                  <>
                    <div className="text-lg font-semibold">Заявка отправлена</div>
                    <p className={`max-w-sm text-sm ${mutedText}`}>
                      Мы приняли ваш запрос и скоро свяжемся для подтверждения времени визита.
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </section>

        <section className={infoSection}>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">С чем поможем</h2>
              <p className={mutedText}>
                Выберите тип техники - мастер приедет с нужными деталями.
              </p>
            </div>
            <a
              className={`text-sm font-semibold ${linkAccent}`}
              href="#contact"
            >
              Нужна консультация? Позвоните
            </a>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.title}
                className={`${infoCard} transition hover:-translate-y-1 hover:shadow-lg`}
              >
                <div className={`text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
                  {service.title}
                </div>
                <ul className={`mt-3 space-y-2 text-sm ${mutedText}`}>
                  {service.items.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section
          className={`overflow-hidden rounded-3xl p-6 ring-1 ${
            isDark ? "bg-slate-900/60 ring-white/10" : "bg-white ring-slate-200 shadow-xl"
          }`}
        >
          <div className="text-sm uppercase tracking-[0.2em] text-slate-300">
            Бренды
          </div>
          <h2 className={`mt-2 text-2xl font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
            Оригинальные запчасти и заводские регламенты
          </h2>
          <div
            className={`mt-6 w-full overflow-hidden rounded-2xl p-4 ring-1 ${
              isDark ? "bg-slate-950/40 ring-white/5" : "bg-slate-100 ring-slate-200"
            }`}
          >
            <div
              className={`animate-marquee whitespace-nowrap text-lg font-semibold ${
                isDark ? "text-slate-100" : "text-slate-800"
              }`}
            >
              {brandLine}
            </div>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className={`${infoSection} space-y-5`}>
            <div className="text-sm uppercase tracking-[0.18em] text-slate-300">
              Этапы работы
            </div>
            <h2 className="text-2xl font-semibold">Как всё проходит</h2>
            <div className="space-y-4">
              {steps.map((step, index) => (
                <div
                  key={step}
                  className={`flex gap-4 rounded-2xl p-4 ring-1 ${isDark ? "bg-slate-950/50 ring-white/10" : "bg-slate-50 ring-slate-200"}`}
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-base font-semibold text-white">
                    {index + 1}
                  </div>
                  <p className={mutedText}>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`space-y-4 rounded-3xl p-8 ring-1 ${isDark ? "bg-slate-900/70 text-slate-50 ring-white/10" : "bg-white text-slate-900 ring-slate-200 shadow-xl"}`}>
            <div className="text-sm uppercase tracking-[0.18em] text-slate-300">
              Прозрачные цены
            </div>
            <h2 className="text-2xl font-semibold">Примерные расценки</h2>
            <div className="space-y-3">
              {prices.map((item) => (
                <div
                  key={item.name}
                  className={`flex items-start justify-between rounded-2xl p-4 ring-1 ${isDark ? "bg-slate-950/50 ring-white/10" : "bg-slate-50 ring-slate-200"}`}
                >
                  <div>
                    <div className="text-lg font-semibold">{item.name}</div>
                    <div className={`text-sm ${mutedText}`}>{item.note}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-semibold text-sky-200">
                      от {item.from} ₽
                    </div>
                    <div className={`text-xs ${mutedText}`}>
                      Диагностика — 0 ₽ при ремонте
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="rounded-2xl bg-sky-500/15 p-4 text-sm text-sky-50 ring-1 ring-sky-400/30">
              Точную стоимость озвучим после диагностики. Мы согласуем смету до
              начала работ — никаких сюрпризов.
            </div>
          </div>
        </section>

        <section className={`grid gap-6 rounded-3xl p-8 shadow-xl ring-1 md:grid-cols-2 ${infoSection}`}>
          <div className="space-y-3">
            <div className="text-sm uppercase tracking-[0.18em] text-slate-300">
              Гарантия
            </div>
            <h2 className="text-2xl font-semibold">До 12 месяцев на работу и детали</h2>
            <p className={mutedText}>
              Используем оригинальные запчасти и официальные регламенты. По завершении
              ремонта вы получаете чек и гарантийный талон.
            </p>
            <ul className={`space-y-2 text-sm ${mutedText}`}>
              <li className="flex items-start gap-2">
                <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                <span>Оригинальные комплектующие - заказ напрямую у поставщиков</span>
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
          <div className={`space-y-4 rounded-2xl p-6 ring-1 ${isDark ? "bg-slate-950/60 ring-white/10" : "bg-slate-100 ring-slate-200"}`}>
            <div className="text-sm uppercase tracking-[0.18em] text-slate-300">
              Контакты
            </div>
            <h3 className={`text-xl font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>
              Москва и ближайшая область
            </h3>
            <p className={mutedText}>
              Выезжаем по городу и области. Пришлите адрес - подскажем, сколько займет
              дорога и во сколько приедет мастер.
            </p>
            <div className={`space-y-2 text-sm ${isDark ? "text-slate-100" : "text-slate-800"}`} id="contact">
              <div className={`font-semibold ${isDark ? "text-slate-50" : "text-slate-900"}`}>Телефон: +7 (800) 123-45-67</div>
              <div>Приём заявок: 8:00-22:00 ежедневно</div>
              <div>Email: info@remont-service.ru</div>
            </div>
            <a
              href="tel:+78001234567"
              className={`inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold text-white transition ${isDark ? "bg-slate-800 hover:bg-slate-700" : "bg-slate-900 hover:bg-slate-800"}`}
            >
              Позвонить мастеру
            </a>
          </div>
        </section>

        <section
          className={`rounded-3xl p-8 ring-1 ${
            isDark ? "bg-slate-900/60 text-slate-50 ring-white/10" : "bg-white text-slate-900 ring-slate-200 shadow-xl"
          }`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Нужна консультация?</h2>
              <p className={mutedText}>
                Опишите проблему - предложим решение и сориентируем по стоимости.
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
                className="rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20"
              >
                Написать на email
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 bg-slate-950/80 py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 px-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <div>© {new Date().getFullYear()} Ремонт крупной техники</div>
          <div className="flex flex-wrap gap-3">
            <span>ИНН 0000000000</span>
            <span>ОГРН 0000000000000</span>
            <a className="text-sky-400 hover:text-sky-300" href="#">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}













