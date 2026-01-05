"use client";

import { BrandsSection } from "./components/BrandsSection";
import { ConsultSection } from "./components/ConsultSection";
import { Footer } from "./components/Footer";
import { GuaranteeSection } from "./components/GuaranteeSection";
import { Header } from "./components/Header";
import { HeroSection } from "./components/HeroSection";
import { PricesSection } from "./components/PricesSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { ServicesSection } from "./components/ServicesSection";
import { StepsSection } from "./components/StepsSection";
import { advantages, brands, prices, reviews, services, steps } from "./data/content";
import { useTheme } from "./hooks/useTheme";
import { getThemeClasses } from "./utils/themeClasses";

export default function Home() {
  const { theme, setTheme, isDark } = useTheme();
  const classes = getThemeClasses(isDark);

  return (
    <div
      className={`relative min-h-screen ${
        isDark ? "bg-slate-950 text-slate-50" : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_10%_20%,rgba(56,189,248,0.15),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(129,140,248,0.12),transparent_30%),radial-gradient(circle_at_90%_60%,rgba(236,72,153,0.08),transparent_22%)]" />

      <Header isDark={isDark} theme={theme} onThemeChange={setTheme} />

      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-6 pb-20 pt-4">
        <HeroSection
          advantages={advantages}
          heroSurface={classes.heroSurface}
          chipSurface={classes.chipSurface}
          mutedText={classes.mutedText}
          isDark={isDark}
          formSurface={classes.formSurface}
          formClasses={{
            inputBase: classes.inputBase,
            inputError: classes.inputError,
            mutedText: classes.mutedText,
          }}
        />

        <ServicesSection
          services={services}
          infoSection={classes.infoSection}
          infoCard={classes.infoCard}
          mutedText={classes.mutedText}
          linkAccent={classes.linkAccent}
          isDark={isDark}
        />

        <BrandsSection brands={brands} isDark={isDark} />

        <section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <StepsSection steps={steps} infoSection={classes.infoSection} mutedText={classes.mutedText} isDark={isDark} />
          <PricesSection prices={prices} isDark={isDark} mutedText={classes.mutedText} />
        </section>

        <ReviewsSection
          reviews={reviews}
          infoSection={classes.infoSection}
          mutedText={classes.mutedText}
          isDark={isDark}
          infoCard={classes.infoCard}
        />

        <GuaranteeSection mutedText={classes.mutedText} isDark={isDark} infoSection={classes.infoSection} />

        <ConsultSection mutedText={classes.mutedText} isDark={isDark} />
      </main>

      <Footer isDark={isDark} />
    </div>
  );
}
