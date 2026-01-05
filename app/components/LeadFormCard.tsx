import type React from "react";
import { useState } from "react";
import type { ThemeStyles } from "@/lib/themeStyles";

type FormState = "idle" | "loading" | "sent";
type FormErrors = Partial<Record<"name" | "phone" | "brand" | "issue", string>>;

type Props = {
  isDark: boolean;
  styles: ThemeStyles;
};

export function LeadFormCard({ isDark, styles }: Props) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [phone, setPhone] = useState<string>("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);

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

  const validateForm = (form: HTMLFormElement) => {
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
    return {
      isValid: Object.keys(nextErrors).length === 0,
      payload: { name, phone: phoneValue, brand, issue },
    };
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const { isValid, payload } = validateForm(form);
    if (!isValid) {
      setFormState("idle");
      return;
    }
    setServerError(null);
    setFormState("loading");

    try {
      const response = await fetch("/api/telegram", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        type ErrorResponse = { error?: string };
        const data = (await response.json().catch(() => null)) as ErrorResponse | null;
        const message = data?.error ?? "Не удалось отправить. Попробуйте ещё раз.";
        throw new Error(message);
      }

      setFormState("sent");
      setTimeout(() => {
        setFormState("idle");
        form.reset();
        setPhone("");
      }, 2400);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Не удалось отправить. Попробуйте ещё раз.";
      setServerError(message);
      setFormState("idle");
    }
  };

  return (
    <div
      className={`rounded-2xl p-6 shadow-2xl shadow-sky-900/30 ring-1 lg:p-8 ${styles.formSurface}`}
    >
      <div className={`mb-5 text-lg font-semibold ${isDark ? "text-white" : "text-slate-900"}`}>
        Оставьте заявку — перезвоним за 5-10 минут
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
                  errors.name ? styles.inputError : `${styles.inputBase} focus:ring-2`
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
                  errors.phone ? styles.inputError : `${styles.inputBase} focus:ring-2`
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
                errors.brand ? styles.inputError : `${styles.inputBase} focus:ring-2`
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
                errors.issue ? styles.inputError : `${styles.inputBase} focus:ring-2`
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
          {serverError ? (
            <div className="rounded-xl bg-rose-500/10 px-4 py-3 text-sm text-rose-200 ring-1 ring-rose-400/40">
              {serverError}
            </div>
          ) : null}
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
              <div className={`text-sm ${styles.mutedText}`}>Отправляем заявку...</div>
            </>
          ) : (
            <>
              <div className="text-lg font-semibold">Заявка отправлена</div>
              <p className={`max-w-sm text-sm ${styles.mutedText}`}>
                Мы приняли ваш запрос и скоро свяжемся для подтверждения времени визита.
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
}
