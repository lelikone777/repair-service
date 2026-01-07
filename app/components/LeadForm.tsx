"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "sent";
type FormErrors = Partial<Record<"name" | "phone" | "brand" | "issue", string>>;

type Props = {
  compact?: boolean;
};

export function LeadForm({ compact }: Props) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});

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

  const validate = (form: HTMLFormElement) => {
    const formData = new FormData(form);
    const name = (formData.get("name") ?? "").toString().trim();
    const phoneValue = (formData.get("phone") ?? "").toString().trim();
    const brand = (formData.get("brand") ?? "").toString().trim();
    const issue = (formData.get("issue") ?? "").toString().trim();

    const phoneDigits = phoneValue.replace(/\D/g, "");
    const nextErrors: FormErrors = {};

    if (name.length < 2) nextErrors.name = "Введите имя (минимум 2 символа).";
    if (phoneDigits.length !== 11) nextErrors.phone = "Укажите телефон полностью (+7 и 10 цифр).";
    if (brand.length < 2) nextErrors.brand = "Уточните тип техники.";
    if (issue.length < 6) nextErrors.issue = "Опишите проблему подробнее (минимум 6 символов).";

    setErrors(nextErrors);
    return { isValid: Object.keys(nextErrors).length === 0 };
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { isValid } = validate(form);
    if (!isValid) {
      setFormState("idle");
      return;
    }
    setErrors({});
    setFormState("loading");

    setTimeout(() => setFormState("sent"), 900);
    setTimeout(() => {
      setFormState("idle");
      form.reset();
      setPhone("");
    }, 2400);
  };

  const inputBase =
    "w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 shadow-inner focus:border-sky-400 focus:outline-none";

  return formState === "idle" ? (
    <form className={compact ? "grid gap-4" : "grid gap-4"} onSubmit={handleSubmit}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          <span>Ваше имя</span>
          <input
            required
            name="name"
            className={`${inputBase} ${errors.name ? "border-rose-400" : ""}`}
            placeholder="Алексей"
            aria-invalid={Boolean(errors.name)}
            aria-describedby="name-error"
          />
          {errors.name ? (
            <p id="name-error" className="text-[11px] text-rose-500">
              {errors.name}
            </p>
          ) : null}
        </label>
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          <span>Телефон</span>
          <input
            required
            name="phone"
            type="tel"
            className={`${inputBase} ${errors.phone ? "border-rose-400" : ""}`}
            placeholder="+7 (___) ___-__-__"
            value={phone}
            onChange={handlePhoneChange}
            maxLength={18}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby="phone-error"
          />
          {errors.phone ? (
            <p id="phone-error" className="text-[11px] text-rose-500">
              {errors.phone}
            </p>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          <span>Тип техники</span>
          <input
            required
            name="brand"
            className={`${inputBase} ${errors.brand ? "border-rose-400" : ""}`}
            placeholder="Холодильник, стиральная машина"
            aria-invalid={Boolean(errors.brand)}
            aria-describedby="brand-error"
          />
          {errors.brand ? (
            <p id="brand-error" className="text-[11px] text-rose-500">
              {errors.brand}
            </p>
          ) : null}
        </label>
        <label className="space-y-2 text-xs font-semibold text-slate-500">
          <span>Кратко опишите проблему</span>
          <input
            required
            name="issue"
            className={`${inputBase} ${errors.issue ? "border-rose-400" : ""}`}
            placeholder="Не холодит, шумит, ошибка E02..."
            aria-invalid={Boolean(errors.issue)}
            aria-describedby="issue-error"
          />
          {errors.issue ? (
            <p id="issue-error" className="text-[11px] text-rose-500">
              {errors.issue}
            </p>
          ) : null}
        </label>
      </div>
      <button
        type="submit"
        className="rounded-xl bg-gradient-to-b from-emerald-400 to-emerald-600 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(16,185,129,0.35)] transition hover:translate-y-[-1px]"
      >
        Вызвать мастера
      </button>
    </form>
  ) : (
    <div className="flex min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-center">
      {formState === "loading" ? (
        <>
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-emerald-500" />
          <div className="text-sm text-slate-600">Отправляем заявку...</div>
        </>
      ) : (
        <>
          <div className="text-base font-semibold text-slate-800">Заявка отправлена</div>
          <p className="max-w-sm text-sm text-slate-500">
            Мы приняли ваш запрос и скоро свяжемся для подтверждения времени визита.
          </p>
        </>
      )}
    </div>
  );
}
