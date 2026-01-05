"use client";

import { useEffect, useRef, useState } from "react";
import type { ThemeChoice } from "../hooks/useTheme";

type Props = {
  isDark: boolean;
  theme: ThemeChoice;
  onThemeChange: (value: ThemeChoice) => void;
};

const themeLabels: Record<ThemeChoice, string> = {
  light: "Светлая",
  dark: "Тёмная",
  system: "Системная",
};

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0-4a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0V4a1 1 0 0 1 1-1Zm0 16a1 1 0 0 1 1 1v2a1 1 0 1 1-2 0v-2a1 1 0 0 1 1-1Zm9-7a1 1 0 0 1-1 1h-2a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1ZM6 12a1 1 0 0 1-1 1H3a1 1 0 1 1 0-2h2a1 1 0 0 1 1 1Zm11.95-6.95a1 1 0 0 1 0 1.41l-1.41 1.41a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0ZM8.46 15.54a1 1 0 0 1 0 1.41L7.05 18.36a1 1 0 1 1-1.41-1.41l1.41-1.41a1 1 0 0 1 1.41 0Zm9.49 2.82a1 1 0 0 1-1.41 0l-1.41-1.41a1 1 0 0 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41ZM8.46 8.46a1 1 0 0 1-1.41 0L5.64 7.05a1 1 0 1 1 1.41-1.41l1.41 1.41a1 1 0 0 1 0 1.41Z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21 15.5A9 9 0 1 1 8.5 3a1 1 0 0 1 .9 1.46A7 7 0 0 0 19.54 14.6a1 1 0 0 1 1.46.9Z"
      />
    </svg>
  );
}

function MonitorIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M4 5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h6v2H8a1 1 0 1 0 0 2h8a1 1 0 1 0 0-2h-2v-2h6a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H4Zm0 2h16v8H4V7Z"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.06l3.71-3.83a.75.75 0 1 1 1.08 1.04l-4.24 4.38a.75.75 0 0 1-1.08 0L5.21 8.27a.75.75 0 0 1 .02-1.06Z"
      />
    </svg>
  );
}

const themeOptions = [
  { value: "light" as const, label: "Светлая", Icon: SunIcon },
  { value: "dark" as const, label: "Тёмная", Icon: MoonIcon },
  { value: "system" as const, label: "Системная", Icon: MonitorIcon },
];

export function Header({ isDark, theme, onThemeChange }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const CurrentIcon = theme === "light" ? SunIcon : theme === "dark" ? MoonIcon : MonitorIcon;

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const menuSurface = isDark
    ? "bg-slate-900/95 text-slate-100 ring-white/10"
    : "bg-white text-slate-900 ring-slate-200";
  const menuItemHover = isDark ? "hover:bg-white/10" : "hover:bg-slate-100";
  const menuItemActive = isDark ? "bg-white/10" : "bg-slate-100";
  const menuIconShell = isDark ? "border-white/10 bg-white/5" : "border-slate-200 bg-slate-100";
  const indicator = isDark ? "bg-sky-400" : "bg-sky-600";

  return (
    <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6">
      <div className="text-lg font-semibold tracking-tight">
        <span className="text-sky-400">РЕМОНТ</span> ТЕХНИКИ
      </div>
      <div className="flex items-center gap-4 text-sm">
        <div className={`hidden sm:block ${isDark ? "text-slate-300" : "text-slate-600"}`}>
          Москва и область
        </div>
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
        <div className="relative" ref={menuRef}>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition ${
              isDark
                ? "border border-white/10 bg-slate-900/60 text-slate-100 shadow-sm shadow-slate-900/40 hover:border-white/30 hover:bg-slate-900/80"
                : "border border-slate-300/60 bg-white text-slate-900 shadow hover:border-slate-400/80 hover:bg-slate-50"
            }`}
            aria-haspopup="menu"
            aria-expanded={open}
          >
            <CurrentIcon />
            <span>Тема: {themeLabels[theme]}</span>
            <ChevronIcon />
          </button>

          {open ? (
            <div
              role="menu"
              className={`absolute right-0 top-full z-20 mt-2 w-44 rounded-2xl p-2 ring-1 shadow-xl ${menuSurface}`}
            >
              {themeOptions.map(({ value, label, Icon }) => {
                const isActive = theme === value;
                return (
                  <button
                    key={value}
                    type="button"
                    role="menuitem"
                    onClick={() => {
                      onThemeChange(value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${menuItemHover} ${
                      isActive ? menuItemActive : ""
                    }`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-lg border ${menuIconShell}`}
                    >
                      <Icon />
                    </span>
                    <span className="flex-1 text-left">{label}</span>
                    <span className={`h-2 w-2 rounded-full ${isActive ? indicator : "bg-transparent"}`} />
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </header>
  );
}
