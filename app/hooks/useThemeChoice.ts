import { useEffect, useState } from "react";

export type ThemeChoice = "light" | "dark" | "system";

export function useThemeChoice() {
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

  const cycleTheme = () =>
    setTheme((prev) =>
      prev === "system" ? "light" : prev === "light" ? "dark" : "system"
    );

  return { theme, setTheme, resolvedTheme, isDark, cycleTheme };
}
