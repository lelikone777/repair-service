"use client";

import { useMemo } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ConsultationSection } from "@/components/sections/ConsultationSection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { BrandsSection } from "@/components/sections/BrandsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { StepsSection } from "@/components/sections/StepsSection";
import { advantages, brands, prices, services, steps } from "@/lib/content";
import { themeStyles } from "@/lib/themeStyles";
import { useThemeChoice } from "@/hooks/useThemeChoice";

export default function Home() {
  const { theme, isDark, cycleTheme } = useThemeChoice();
  const styles = themeStyles(isDark);

  const brandHighlights = useMemo(
    () => brands.slice(0, 5).join(" · "),
    []
  );
  const brandMarqueeLine = useMemo(
    () => [...brands, ...brands].join(" · "),
    []
  );

  return (
    <div
      className={`relative min-h-screen ${
        isDark
          ? "bg-slate-950 text-slate-50"
          : "bg-[var(--gradient-page)] text-slate-900"
      }`}
    >
      {isDark && (
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.12),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(236,72,153,0.08),transparent_22%)]" />
      )}

      <SiteHeader theme={theme} isDark={isDark} onThemeCycle={cycleTheme} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-4">
        <HeroSection
          isDark={isDark}
          styles={styles}
          brandHighlights={brandHighlights}
          advantages={advantages}
        />

        <ServicesSection isDark={isDark} styles={styles} services={services} />

        <BrandsSection isDark={isDark} brandLine={brandMarqueeLine} />

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <StepsSection isDark={isDark} styles={styles} steps={steps} />
          <PricingSection isDark={isDark} styles={styles} prices={prices} />
        </section>

        <GuaranteeSection isDark={isDark} styles={styles} />

        <ConsultationSection isDark={isDark} mutedTextClass={styles.mutedText} />
      </main>

      <SiteFooter isDark={isDark} />
    </div>
  );
}
