"use client";

import { useState } from "react";
import type { ThemeClasses } from "../utils/themeClasses";

type FormState = "idle" | "loading" | "sent";
type FormErrors = Partial<Record<"name" | "phone" | "brand" | "issue", string>>;

type Props = {
  classes: Pick<ThemeClasses, "inputBase" | "inputError" | "mutedText">;
  isDark: boolean;
};

export function LeadForm({ classes, isDark }: Props) {
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
    if (brand.length < 2) nextErrors.brand = "Уточните бренд и тип техники.";
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

  const inputBase = classes.inputBase;
  const inputError = classes.inputError;
  const mutedText = classes.mutedText;
  const labelText = isDark ? "text-slate-200" : "text-slate-700";

  return formState === "idle" ? (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className={`space-y-3 text-sm ${labelText}`}>
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
        <label className={`space-y-3 text-sm ${labelText}`}>
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
      <label className={`space-y-3 text-sm ${labelText}`}>
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
      <label className={`space-y-3 text-sm ${labelText}`}>
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
      <p className={`text-xs ${mutedText}`}>
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
  );
}
